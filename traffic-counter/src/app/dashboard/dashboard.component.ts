import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { TransportService } from '../services/transport.service';
import { UnitService } from '../services/unit.service';
import { UserService } from '../services/user.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public unitService: UnitService, public userService: UserService, public transService: TransportService, public reportService: ReportService) { }

  public noOfUnit = "";
  public unitArray = [];
  public noOfUser = "";
  public date;
  public reportArrayForUnit = [];
  public countForUnit = 0;
  public reportArrayForAllUnit = [];
  public countForAllUnit = 0;
  public adminUnit = "";
  public forTrans = [];
  public forTransValue = [];
  public arrForTranCount = [];
  public arrForUnitcount = [];
  public forUnitCount = [];
  public forUnitCountValue = [];
  public times = ["12:00AM-04:00AM", "04:00AM-08:00AM", "08:00AM-12:00PM", "12:00PM-04:00PM", "04:00PM-08:00PM", "08:00PM-12:00AM"];
  public timeCountValue = [];
  public arrForTimeCount = [];
  public timeCountArray = [];
  public color = []

  ngOnInit(): void {
    this.getAllUnit();
    this.getAllUser();
    this.getDate();
    this.getTotalCount();
    this.geCountForAllUnit();
    this.getTransCount();
    this.getUnitCount();
    this.getCountPerTime();
    // this.reportForAllTransport();

  }

  generatingColor() {
    let red = Math.floor(Math.random() * 251);
    let green = Math.floor(Math.random() * 251);
    let blue = Math.floor(Math.random() * 251);
    let alpha = Math.floor((Math.random() * 1 + 1));
    let color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    return color;
  }

  getDate() {
    let date = new Date();
    this.date = date.toLocaleDateString();

  }
  
  //Function for getting all unit
  getAllUnit() {
    this.unitService.getUnit().subscribe(data => {
      this.noOfUnit = data.length;
    })
  }

  // Funtion getting all users
  getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      this.noOfUser = data.length;
    })
  }

  // Function getting total count for the online user unit
  getTotalCount() {
    let getUserDetails = JSON.parse(localStorage.getItem("trafficUserDet"));
    this.adminUnit = getUserDetails.unit_name;
    let obj = {date: this.date, unit_id: getUserDetails.unit_id};
    this.reportService.getReportPerUnit(obj).subscribe(data => {
      console.log(data);
      this.reportArrayForUnit = data;
      this.reportArrayForUnit.map(report => {
        this.countForUnit+=Number(report.value);
      })
    })
  }

  // Function getting total count for all unit
  geCountForAllUnit() {
    let obj = {date: this.date}
    this.reportService.getReportForAllUnit(obj).subscribe(data => {
      console.log(data)
      this.reportArrayForAllUnit = data;
      this.reportArrayForAllUnit.map(report => {
      this.countForAllUnit+=Number(report.value);
      })
    })
    
  }
  // Function getting the count for transport means vs total count
  getTransCount() {
    let obj = {date: this.date}
    this.reportService.getReportForAllUnit(obj).subscribe(data => {
      data.map(report => {
        let findIndex = this.arrForTranCount.findIndex(find=> find.transport_name == report.transport_name);
        if (findIndex >= 0) {
          this.arrForTranCount[findIndex].value = Number(this.arrForTranCount[findIndex].value) + Number(report.value);
          Number(this.arrForTranCount[findIndex].value);
        } else {
          Number(report.value);
          this.arrForTranCount.push(report);
        }
      })
      console.log(this.arrForTranCount);
      this.arrForTranCount.map(trans => {
        this.forTrans.push(trans.transport_name)
        this.forTransValue.push(trans.value);
      })
      this.arrForTranCount.map(forcolor => {
        let eachColor = this.generatingColor();
        this.color.push(eachColor)
      })
      this.drawChartForTransCount();
    })
  }

  //Function getting the count for each unit vs their total count
  getUnitCount () {
    let obj = {date: this.date}
    this.reportService.getReportForAllUnit(obj).subscribe(data => {
      this.reportArrayForAllUnit.map(report => {
        let findIndex = this.arrForUnitcount.findIndex(find => find.unit_id == report.unit_id);
        if (findIndex >= 0) {
          this.arrForUnitcount[findIndex].value = Number(this.arrForUnitcount[findIndex].value) + Number(report.value);
          Number(this.arrForUnitcount[findIndex].value);
        } else {
          this.arrForUnitcount.push(report);
        }
      })
      this.arrForUnitcount.map(count => {
        this.forUnitCount.push(count.unit_name);
        this.forUnitCountValue.push(count.value);
      })
      this.arrForTranCount.map(forcolor => {
        let eachColor = this.generatingColor();
        this.color.push(eachColor)
      })
      this.drawChartForUnitCount();
    })
  }

  //Function getting the count for time vs the total count within the time interval
  getCountPerTime() {
    let obj = {date: this.date}
    this.reportService.getReportForAllUnit(obj).subscribe(data => {
      console.log(data, "dddd");
      this.timeCountArray = data;
      let date = new Date();
      data.map((each, i) => {
        let date = new Date(this.timeCountArray[i].time);
        let holdHour = date.getHours();
        let holdMinute = date.getMinutes();
        this.timeCountArray[i].holdHour = holdHour;
        this.timeCountArray[i].HoldMinue = holdMinute;
  
        if (this.timeCountArray[i].holdHour >=0 && this.timeCountArray[i].holdHour <=3) {
          this.timeCountArray[i].range = "12:00AM-4:00AM";
        } else if (this.timeCountArray[i].holdHour >=4 && this.timeCountArray[i].holdHour <=7) {
          this.timeCountArray[i].range = "04:00AM-08:00AM";
        } else if (this.timeCountArray[i].holdHour >=8 && this.timeCountArray[i].holdHour <=11) {
          this.timeCountArray[i].range = "08:00AM-12:00PM";
        } else if (this.timeCountArray[i].holdHour >=12 && this.timeCountArray[i].holdHour <=15) {
          this.timeCountArray[i].range = "12:00PM-04:00PM";
        } else if (this.timeCountArray[i].holdHour >=16 && this.timeCountArray[i].holdHour <=19) {
          this.timeCountArray[i].range = "04:00PM-08:00PM";
        } else if (this.timeCountArray[i].holdHour >=20 && this.timeCountArray[i].holdHour <=23) {
          this.timeCountArray[i].range = "08:00PM-12:00AM";
        }
      })
      let arrForTimeCount = [];
      this.timeCountArray.map(report => {
        let findIndex = arrForTimeCount.findIndex(find => find.range == report.range);
        if (findIndex >= 0) {
          arrForTimeCount[findIndex].value = Number(arrForTimeCount[findIndex].value) + Number(report.value)
        } else {
          arrForTimeCount.push(report);
        }
      })
      this.times.map(time => {
        let findObj = arrForTimeCount.find(find => find.range == time);
        if (findObj) {
          this.arrForTimeCount.push(findObj)
        } else {
          let obj = {time, value: 0};
          this.arrForTimeCount.push(obj)
        }
      })
      this.arrForTimeCount.map(time => {
        this.timeCountValue.push(time.value);
      })
      this.arrForTranCount.map(forcolor => {
        let eachColor = this.generatingColor();
        this.color.push(eachColor)
      })
      this.drawChartForCountPerTime();
    })
  }

  //Function drawing the chart for transport means vs total count
  drawChartForTransCount() {
    let ctx = document.getElementById('chartForTransCount');
      // console.log(this.show, "SHOW VALUE")
      // console.log(ctx, "CTX")
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.forTrans,
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

   //Function drawing the chart for unit vs total count
  drawChartForUnitCount() {
    let ctx = document.getElementById('chartForUnitCount');
      // console.log(this.show, "SHOW VALUE")
      // console.log(ctx, "CTX")
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.forUnitCount,
            datasets: [{
                label: '# of Traffic-Count-Distribution',
                data: this.forUnitCountValue,
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

   //Function drawing the chart for time vs total count
  drawChartForCountPerTime() {
    let ctx = document.getElementById('chartForCountPerTime');
      // console.log(this.show, "SHOW VALUE")
      // console.log(ctx, "CTX")
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.times,
            datasets: [{
                label: '# of Traffic-Count-Distribution',
                data: this.timeCountValue,
                backgroundColor: this.color,
                borderColor: [
                    
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
