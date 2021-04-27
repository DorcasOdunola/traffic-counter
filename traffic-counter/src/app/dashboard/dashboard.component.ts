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
  

  ngOnInit(): void {
    this.getAllUnit();
    this.getAllUser();
    this.getDate();
    this.getTotalCount();
    this.geCountForAllUnit();
    // this.reportForAllTransport();

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
      console.log(data, "data");
      this.reportArrayForAllUnit = data;
      this.reportArrayForAllUnit.map(report => {
        this.countForAllUnit+=Number(report.value);
      })
      this.getTransCount();
      this.getUnitCount();
      this.getCountPerTime();
    })
  }

 getTransCount() {
    this.reportArrayForAllUnit.map(report => {
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
    this.drawChartForTransCount();
  }

  getUnitCount () {
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
    this.drawChartForUnitCount();
  }

  getCountPerTime() {
    let date = new Date();
    this.reportArrayForAllUnit.map((each, i) => {
      let date = new Date(this.reportArrayForAllUnit[i].time);
      let holdHour = date.getHours();
      let holdMinute = date.getMinutes();
      console.log(holdHour, holdMinute);
      let holdTime = `${holdHour}:${holdMinute}`
      this.reportArrayForAllUnit[i].convertTime = holdTime;
    })
    console.log(this.reportArrayForAllUnit);
  }


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
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 140, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 140, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
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
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 140, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 140, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
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
