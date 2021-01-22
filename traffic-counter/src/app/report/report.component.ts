import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { UnitService } from '../services/unit.service';

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
  public selectedIndex = 0;
  public reportArray = [];
  public totalReport = [];
  public selectDate = "";
  public dDate = "";
  public fromDate = "";
  public toDate = "";

  ngOnInit(): void {
    this.getAllUnit();
    this.getReport();
  }

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

  getReport() {
    let date = new Date();
    let dDate = date.toLocaleDateString();
    console.log(dDate);
    let obj = {date: dDate}
    this.reportService.getReportPerUnit(obj).subscribe(data => {
      if (data.getReport == false) {
        return;
      } else {
        this.reportArray = data;
      }
    })
  }

  getUnitId(event) {
    this.totalReport = [];
    this.unit_id = event.value;
    let filtered = this.reportArray.filter(report => report.unit_id == this.unit_id);
    console.log(filtered, "wholeReport");
    filtered.map(report => {
      let find = this.totalReport.findIndex(find => find.transport_id == report.transport_id);
      if (find >= 0) {
          this.totalReport[find].value = Number(this.totalReport[find].value) + Number(report.value);
          Number(this.totalReport[find].value);
      } else {
        this.totalReport.push(report);        
      }
    })
    console.log(this.totalReport, "totalReport");
  }

  getReportPerDay() {
    console.log(this.selectDate);
    console.log(this.unit_id);
    let date = new Date(this.selectDate);
    let dDate = date.toLocaleDateString();
    let obj = {date: dDate}
    this.reportService.getReportPerUnit(obj).subscribe(data => {
      if (data.getReport == false) {
        return;
      } else {
        console.log(data);
        this.reportArray = data;
        this.getUnitId(this.unit_id);
      }
    })
  }

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
        this.reportArray = data;
        let filtered = this.reportArray.filter(report => report.unit_id == this.unit_id);
      console.log(filtered, "wholeReport");
      filtered.map(report => {
        let find = this.totalReport.findIndex(find => find.transport_id == report.transport_id);
        if (find >= 0) {
            this.totalReport[find].value = Number(this.totalReport[find].value) + Number(report.value);
            Number(this.totalReport[find].value);
        } else {
          this.totalReport.push(report);        
      }
    })
       
      }
    })
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
