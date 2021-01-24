import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { UnitService } from '../services/unit.service';
import { Chart } from 'chart.js'
import { find } from 'rxjs/operators';
import { range } from 'rxjs';
// import {Chart} from 'chart.js'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(public unitService: UnitService, public reportService: ReportService) { }

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

  forDate(date = ""){
    return date ? new Date(date) : new Date()
  }
  ngOnInit(): void {
    // let date = this.forDate('1/1/2001');
    // console.log(date.getDay());
    this.getAllUnit();
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
          this.getTotalReport(this.reportArray);
        } else {
          this.info = `No Report Yet. Select a unit of a your choice to check report for ${dDate}`
        }
      }
    })
  }
  
  // FUNCTION FOR GETTING REPORT FOR UNIT FOR THE DAY SELECTED
  getReportPerDay() {
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
          this.show == true;
          this.getTotalReport(this.reportArray)
        } else {
          this.info = `No Report in this unit for this day-${dDate}`
          this.show = false;
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
          this.getTotalReportPerRange(rangeArray);
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
    let totalRangeReport = [];
    reportArray.map((report, i) => {
      let date = this.forDate(report.day_date);
      let dateIndex = date.getDay();
      let theDate = this.days[dateIndex];
      reportArray[i].day = theDate;
    })
    console.log(reportArray);
    reportArray.map(reprt => {
      let find = totalRangeReport.findIndex(find => (find.day) == (reprt.day));
        if (find >= 0) {
          totalRangeReport[find].value = Number(totalRangeReport[find].value) + Number(reprt.value);
        } else {
          totalRangeReport.push(reprt);
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
    this.forTrans = [];
    console.log(this.totalRangeReport);
    this.totalRangeReport.map(rprt => {
      this.forTrans.push(rprt.day);
      this.forValue.push(rprt.value);
    })
    this.showForRange = true;
    this.show = false;
    this.drawChatForRange();
  }

  drawChart () {      
    let ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: this.forTrans,
          datasets: [{
              label: '# of Votes',
              data: this.forValue,
              backgroundColor: this.color,
              // borderColor: [
              //     'rgba(255, 99, 132, 1)',
              //     'rgba(54, 162, 235, 1)',
              //     'rgba(255, 206, 86, 1)',
              //     'rgba(75, 192, 192, 1)',
              //     'rgba(153, 102, 255, 1)',
              //     'rgba(255, 159, 64, 1)',
              //     // 'rgba(255, 140, 64, 0.2)',
              //     // 'rgba(255, 159, 64, 0.2)'
              // ],
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

  drawChatForRange() {
    let ctx = document.getElementById('chartForRange');
    console.log(this.show, "SHOW VALUE")
    console.log(ctx, "CTX")
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.forTrans,
          datasets: [{
              label: '# of Votes',
              data: this.forValue,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                  // 'rgba(255, 159, 50, 0.2)',
                  // 'rgba(255, 150, 64, 0.2)'
              ],
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

  // tabChanged(e){
  //   // console.log(e);
  //   this.selectedIndex = e;
  //   this.unit_id = this.unitArray[e].unit_id;
  // }

  // createDay() {
  //   let date = new Date();
  //   this.dDate = date.toLocaleDateString();
  // }

}
