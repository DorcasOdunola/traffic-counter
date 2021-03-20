import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { UnitService } from '../services/unit.service';
import { Chart } from 'chart.js'
import { TransportService } from '../services/transport.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ValueTransformer } from '@angular/compiler/src/util';
// import {Chart} from 'chart.js'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(public unitService: UnitService, public reportService: ReportService, public transportService: TransportService) { }

  public noOfUnit = "";
  public noOfCentalUnit = "";
  public noOfSubUnit = ""
  public unitArray = [];
  public unit_id = 1;
  public reportArray = [];
  public totalReport = [];
  public selectDate = "";
  public dDate = "";
  public fromDate = "";
  public toDate = "";
  public show = false;
  public showForUnitId = false;
  public info = "";
  public unit_name = "";
  public forTrans = [];
  public forValue = [];
  public days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
  public showForRange = false
  public rangeArray = [];
  public reportRangeArray = [];
  public totalRangeReport = [];
  public color = [];
  public displayDay = false;
  public displayRange = false;
  public forDays = [];
  public timeArray = [];
  public totalValue = [];
  public timeValue = [];
  public transPerRange =  [];
  public forTransRange = [];
  public forTransValue = [];
  public times = ["12:00AM-04:00AM", "04:00AM-08:00AM", "08:00AM-12:00AM", "12:00PM-04:00PM", "04:00PM-08:00PM", "08:00PM-12:00AM"];
  public finalTimeArray = [];


  forDate(date = ""){
    return date ? new Date(date) : new Date()
  }
  ngOnInit(): void {
    let date = this.forDate();
    this.dDate = date.toLocaleDateString();
    this.getAllUnit();
    this.info = `No Report Yet. Select a unit of a your choice to check report for ${this.dDate}`;

    document.getElementById("chartForRange").style.display = "none";
    document.getElementById("transChart").style.display = "none";
    document.getElementById("timeChart").style.display = "none";
    document.getElementById("chartForTransRange").style.display = "none";
  }

  // Function getting all unit
  getAllUnit() {
    this.unitService.getUnit().subscribe(data => {
      this.noOfUnit = data.length;
      this.unitArray = data;
      let filteredCentral = data.filter(unit => unit.status == "Central Unit");
      let filteredSubUnit = data.filter(unit => unit.status == "Sub-Unit");
      this.noOfCentalUnit = filteredCentral.length;
      this.noOfSubUnit = filteredSubUnit.length;
    })
  }

  // function getting all transport means
  getAllTransport(unit_id) {
    this.forTrans = [];
    this.forValue = [];
    this.totalReport = [];
    this.transportService.getTrans(unit_id).subscribe(data => {
      console.log(data);
      data.map(each => {
        each.value = 0;
        this.totalReport.push(each)
      })
      this.totalReport.map(each => {
        this.forTrans.push(each.transport_name);
        this.forValue.push(each.value);
      })
      this.drawChart();
      console.log(this.forTrans);
      console.log(this.totalReport);
    })
  }

  // Function Selecting report type
  reportType(event) {
    let value = event.value;
    if (value == "day") {
       this.displayDay = true;
       this.displayRange = false;
    } else if (value == "range") {
      this.displayRange = true;
      this.displayDay = false;
    }
  }
  // Function getting report for each unit by default
  getReportForUnit(event) {
    this.unit_id = event.value;
    this.showForUnitId = true;
    let date = new Date();
    let dDate = date.toLocaleDateString();
    this.dDate = date.toLocaleDateString();
    let obj = {date: dDate, unit_id: this.unit_id}
    this.reportService.getReportPerUnit(obj).subscribe(data => {
      if (data.getReport == false) {
        return;
      } else {
        this.reportArray = data;
        console.log(this.reportArray)
        if (this.reportArray.length != 0) {
          document.getElementById("transChart").style.display = "block";
          document.getElementById("timeChart").style.display = "block";
          this.getTotalReport(this.reportArray);
          this.getReportperTime(this.dDate);
          this.info = `Report for ${this.dDate}(In Tables and Chart)`;
        } else {
          this.getAllTransport(this.unit_id);
          this.show = true;
          this.info = `No Report in this unit for ${dDate}`;
        }
      }
    })
  }
  
  // FUNCTION FOR GETTING REPORT FOR UNIT FOR THE DAY SELECTED
  getReportPerDay() {
    this.forTrans = [];
    this.forValue = [];
    let date = new Date(this.selectDate);
    let dDate = date.toLocaleDateString();
    let obj = {date: dDate, unit_id: this.unit_id};
    this.reportService.getReportPerUnit(obj).subscribe(data => {
      if (data.getReport == false) {
        return;
      } else {
        console.log(data);
        this.reportArray = data;
        if (this.reportArray.length != 0) {
          document.getElementById("transChart").style.display = "block";
          document.getElementById("timeChart").style.display = "block";
          // document.getElementById("transChart").innerHTML = "nnnnn";
          // document.getElementById("timeChart").innerHTML = "nnnnnn";
          document.getElementById("chartForRange").style.display = "none";
          document.getElementById("chartForTransRange").style.display = "none";
          this.show == true;
          this.showForRange = false;
          this.getTotalReport(this.reportArray);
          this.info = `Report for ${dDate}(In Tables and Chart)`;
          this.getReportperTime(dDate)
        } else {
          this.info = `No Report in this unit for this day-${dDate}`
          this.getAllTransport(this.unit_id);
          this.show = true;
        }
      }
    })
  }

  // FUNCTION FOR FILTERING THE ALL REPORT
  getTotalReport (reportArray) {
    this.totalReport = [];
    this.color = [];
    reportArray.map(report => {
      let find = this.totalReport.findIndex(find => find.transport_id == report.transport_id);
      if (find >= 0) {
          this.totalReport[find].value = Number(this.totalReport[find].value) + Number(report.value);
          Number(this.totalReport[find].value);
      } else {
        this.totalReport.push(report); 
      }
    })
    this.totalReport.map(forcolor => {
      let eachcolor = this.generatingColor();
      this.color.push(eachcolor);
    })
    console.log(this.color)
    this.forTrans = [];
    this.forValue = [];
    this.totalReport.map(each => {
      this.forTrans.push(each.transport_name);
      this.forValue.push(each.value);
    })  
    this.show = true;
    this.drawChart();
  }

  // Function for getting report per range
  getReportPerRange () {
    let frmDate = new Date(this.fromDate);
    let fromDate = frmDate.toLocaleDateString();
    let getToDate = new Date(this.toDate);
    let toDate = getToDate.toLocaleDateString();
    let unit_id = this.unit_id;
    let dateObj = {fromDate, toDate, unit_id};
    console.log(dateObj);
    this.reportService.getReportPerRange(dateObj).subscribe(data => {
      if (data.getReport == false) {
        return;
      } else {
        let rangeArray = data;
        if (rangeArray.length != 0) {
          document.getElementById("chartForRange").style.display = "block";
          document.getElementById("chartForTransRange").style.display = "block";
          document.getElementById("transChart").style.display = "none";
          document.getElementById("timeChart").style.display = "none";
          this.getTotalReportPerRange(rangeArray);
          this.info = `Report for ${fromDate} to ${toDate}(In Tables and Chart)`;
        } else {
          this.info = `No Report in this unit from -${fromDate} to ${toDate}`
          this.show = false;
        }
      }
    })
  }

  // Function generating random colors
  generatingColor() {
   let red = Math.floor(Math.random() * 251);
   let green = Math.floor(Math.random() * 251);
   let blue = Math.floor(Math.random() * 251);
   let alpha = Math.floor((Math.random() * 1 + 1));
   let color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
   return color;
  }

  // Function filtering and getting value for report per range(day -> total count)
  getTotalReportPerRange(reportArray){
    this.totalRangeReport = [];
    let totalRangeReport = [];
    reportArray.map((report, i) => {
      let date = this.forDate(report.day_date);
      let dateIndex = date.getDay();
      let theDate = this.days[dateIndex];
      reportArray[i].day = theDate;
    })
    reportArray.map(reprt => {
      let find = totalRangeReport.findIndex(find => (find.day) == (reprt.day));
        if (find >= 0) {
          totalRangeReport[find].value = Number(totalRangeReport[find].value) + Number(reprt.value);
        } else {
          totalRangeReport.push(reprt);
        }
    })
    reportArray.map(reprt => {
      let find = this.transPerRange.findIndex(find => (find.transport_id) == (reprt.transport_id));
        if (find >= 0) {
          this.transPerRange[find].value = Number(this.transPerRange[find].value) + Number(reprt.value);
        } else {
          this.transPerRange.push(reprt);
        }
    })
    this.days.map(day => {
      let findObj = totalRangeReport.find(find => find.day == day);
      if (findObj) {
        this.totalRangeReport.push(findObj)
      } else {
        let obj = {day, value: 0};
        this.totalRangeReport.push(obj);
      }
    })
    this.forValue = [];
    this.forDays = [];
    this.forTransRange = [];
    this.forTransValue = [];
    this.totalRangeReport.map(rprt => {
      this.forDays.push(rprt.day);
      this.forValue.push(rprt.value);
    })
    this.transPerRange.map(rprt => {
      this.forTransRange.push(rprt.transport_name);
      this.forTransValue.push(rprt.value);
    })
    this.showForRange = true;
    this.show = false;
    this.drawChatForRange();
    this.drawChartForTransRange();
  }
  // Function getting report for a unit per time
  getReportperTime(dDate) {
    let timeObj ={date: dDate, unit_id: this.unit_id};
    console.log(timeObj);
    let timeArray = [];
    this.reportService.getReportPerTime(timeObj).subscribe(data => {
      timeArray = data;
      timeArray.map((each, i) => {
        let dateTime = this.forDate(timeArray[i].time);
        let holdHour =  dateTime.getHours();
        let holdMinute = dateTime.getMinutes();
        let holdTime = `${holdHour}:${holdMinute}`;
        timeArray[i].holdHour = holdHour;
        timeArray[i].convertTime = holdTime;

        if (timeArray[i].holdHour >=0 && timeArray[i].holdHour <=3) {
          timeArray[i].range = "12:00AM-4:00AM";
        } else if (timeArray[i].holdHour >=4 && timeArray[i].holdHour <=7) {
          timeArray[i].range = "04:00AM-08:00AM";
        } else if (timeArray[i].holdHour >=8 && timeArray[i].holdHour <=11) {
          timeArray[i].range = "08:00AM-12:00AM";
        } else if (timeArray[i].holdHour >=12 && timeArray[i].holdHour <=15) {
          timeArray[i].range = "12:00PM-04:00PM";
        } else if (timeArray[i].holdHour >=16 && timeArray[i].holdHour <=19) {
          timeArray[i].range = "04:00PM-08:00PM";
        } else if (timeArray[i].holdHour >=20 && timeArray[i].holdHour <=23) {
          timeArray[i].range = "08:00PM-12:00AM";
        }
      })
      console.log(timeArray);
      timeArray.map(each => {
        let find = this.timeArray.findIndex(find => find.range == each.range);
        if (find >= 0) {
          this.timeArray[find].value = Number(this.timeArray[find].value) + Number(each.value);
        } else {
          this.timeArray.push(each);
        }
      })
      console.log(this.timeArray);
      this.times.map(time => {
        let findObj = this.timeArray.find(find => find.range == time);
        if (findObj) {
          this.finalTimeArray.push(findObj)
        } else {
          let obj = {time, value: 0};
          this.finalTimeArray.push(obj)
        }
      })
      this.totalValue = [];
      this.timeValue = [];
      this.finalTimeArray.map(time => {
        this.totalValue.push(time.range);
        this.timeValue.push(time.value);
      })
      this.drawChartForTime();
      this.generatingColor();
      console.log(this.finalTimeArray);
    })
  }

  // Chart for transport means against their total value(count)
  drawChart () {      
    let ctx = document.getElementById('transChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: this.forTrans,
          datasets: [{
              label: '# of Traffic-Count-Distribution',
              data: this.forValue,
              backgroundColor: this.color,
              borderWidth: 1
          }]
      },
      options: {
        // event: ['onHover'],
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }); 
  }

  // Function drawing chart for transport means against their total value per range
  drawChartForTransRange() {
    let ctx = document.getElementById('chartForTransRange');
      console.log(this.show, "SHOW VALUE")
      console.log(ctx, "CTX")
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.forTransRange,
            datasets: [{
                label: '# of Traffic-Count-Distribution',
                data: this.forTransValue,
                backgroundColor: this.color,
                borderColor: [
                    // 'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                    // 'rgba(255, 140, 64, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                }]
            }
        }
     }); 
  }

  // Function drawing chart for transport means against their total Value(count) per range in days
  drawChatForRange() {
    let ctx = document.getElementById('chartForRange');
    console.log(this.show, "SHOW VALUE")
    console.log(ctx, "CTX")
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.forDays,
          datasets: [{
              label: '# of Traffic-Count-Distribution',
              data: this.forValue,
              backgroundColor: this.color,
              // [
              //     'rgba(255, 99, 132, 0.2)',
              //     'rgba(54, 162, 235, 0.2)',
              //     'rgba(255, 206, 86, 0.2)',
              //     'rgba(75, 192, 192, 0.2)',
              //     'rgba(153, 102, 255, 0.2)',
              //     'rgba(255, 159, 64, 0.2)'
              //     // 'rgba(255, 159, 50, 0.2)',
              //     // 'rgba(255, 150, 64, 0.2)'
              // ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  // 'rgba(255, 140, 64, 0.2)',
                  // 'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
   }); 
  }

  // function drawing the chart for total value of count against time
  drawChartForTime() {
    let ctx = document.getElementById('timeChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.times,
          datasets: [{
              label: '# of Traffic-Count-Distribution',
              data: this.timeValue,
              backgroundColor: this.color,
              borderColor: [
                  // 'rgba(255, 99, 132, 1)',
                  // 'rgba(54, 162, 235, 1)',
                  // 'rgba(255, 206, 86, 1)',
                  // 'rgba(75, 192, 192, 1)',
                  // 'rgba(153, 102, 255, 1)',
                  // 'rgba(255, 159, 64, 1)',
                  // 'rgba(255, 140, 64, 0.2)',
                  // 'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  }); 

  }

}
