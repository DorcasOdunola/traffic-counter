import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { TransportService } from '../services/transport.service';
import { UnitService } from '../services/unit.service';
import { UserService } from '../services/user.service';

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

  ngOnInit(): void {
    this.getAllUnit();
    this.getAllUser();
    this.getDate();
    this.getTotalCount();
    this.getReportForAllUnit();
  }

  getDate() {
    let date = new Date();
    this.date = date.toLocaleDateString();

  }

  getAllUnit() {
    this.unitService.getUnit().subscribe(data => {
      this.noOfUnit = data.length;
    })
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      this.noOfUser = data.length;
    })
  }

  getTotalCount() {
    let getUserDetails = JSON.parse(localStorage.getItem("trafficUserDet"));
    let obj = {date: this.date, unit_id: getUserDetails.unit_id};
    console.log(obj);
    console.log(getUserDetails);
    this.reportService.getReportPerUnit(obj).subscribe(data => {
      console.log(data);
      this.reportArrayForUnit = data;
      this.reportArrayForUnit.map(report => {
        this.countForUnit+=Number(report.value);
      })
      console.log(this.countForUnit)
    })
  }

  getReportForAllUnit() {
    let obj = {date: this.date}
    this.reportService.getReportForAllUnit(this.date).subscribe(data => {
      console.log(data);
      // this.reportArrayForUnit = data;
      // this.reportArrayForUnit.map(report => {
      //   this.countForUnit+=Number(report.value);
      // })
      // console.log(this.countForUnit)
    })
  }

}
