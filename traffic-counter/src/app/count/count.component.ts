import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { TransportService } from '../services/transport.service';
import { DayService } from '../services/day.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {

  constructor(public transService: TransportService, public reportService: ReportService, public dayService: DayService) { }

  public userDetails:any = {};
  public transArray: any = [];
  public saveCountArray = [];
  public unit_name;
  public date;
  public unit_time;
  public info = "";
  public unit_id = "";
  public user_id = "";
  public value;
  public unit_id2 = "";
  public count_interval = "";
  public reportArray = [];
  public totalReport = [];
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("trafficUserDet"));
    this.unit_id = this.userDetails.unit_id;
    this.unit_name = this.userDetails.unit_name;
    this.user_id = this.userDetails.user_id;
    this.count_interval = this.userDetails.count_interval;
    this.getDetails();
    this.getTimeDate();
    this.getTrans();
    this.getAllReport();
    let dayObj = {unit_id: this.unit_id, day: this.date};
    this.dayService.getDay(dayObj).subscribe(data => {
      data.map(date => {
        this.unit_id2 = date.day_id;
      })
      console.log(this.unit_id2);
    })
    setInterval(()=> {
      this.getTrans();
      this.getAllReport();
    }, 60000)
  }

  getTrans() {
    this.transService.getTrans(this.unit_id).subscribe(data => {
      if (data.message == "no transport means") {
        this.info = `No Transport Means for Counting in ${this.unit_name} Unit!!!`
      } else {
        this.transArray = data;
        this.info = "";
      }
    })
  }

  // Function getting all report for the day and the unit the person online belongs to
  getAllReport() {
    let getObj = {date: this.date, unit_id: this.unit_id}
    this.reportService.getReportPerUnit(getObj).subscribe(data => {
      this.reportArray = data;
      this.filter(this.reportArray);
    })
  }
  // Function that filter the report to getting the total value for each transport means
  filter(reportArray) {
    this.totalReport = [];
      reportArray.map(report => {
      let find = this.totalReport.findIndex(find =>find.transport_id == report.transport_id);
      if (find >= 0) {
        this.totalReport[find].value = Number(this.totalReport[find].value) + Number(report.value);
        Number(this.totalReport[find].value);
      } else {
        this.totalReport.push(report); 
      }
    })
    this.totalReport.map(report => {
      let findIndex = this.transArray.findIndex(trans => trans.transport_id == report.transport_id);
      if (findIndex >= 0) {
        this.transArray[findIndex].value = report.value
      }
    })
    console.log(this.transArray);
  }
  getDetails() {
    let date = new Date();
    this.date = date.toLocaleDateString();
  }
  
  getTimeDate () {
    var time = new Date();
    let hrs = time.getHours();
    let min = time.getMinutes();
    if (hrs>12) {
      hrs = hrs-12;
      this.unit_time = `${hrs}:${min} PM`;
    } else {
      this.unit_time = `${hrs}:${min} AM`;
    }
  }

  increaseCount(transport_id) {
    if (localStorage.getItem("CountArray") != null) {
      this.saveCountArray = JSON.parse(localStorage.getItem("CountArray"));
    } else {
      this.saveCountArray = [];
    }
    if (this.saveCountArray == []) {
      let obj = {transport_id, unit_id: this.unit_id, day_id: this.unit_id2, value: 1};
      this.saveCountArray.push(obj);
    } else {
      let findIndex = this.saveCountArray.findIndex(trans => trans.transport_id == transport_id);
      console.log(findIndex);
      if (findIndex >= 0) {
        this.saveCountArray[findIndex].value = this.saveCountArray[findIndex].value+=1;
        localStorage.setItem("CountArray", JSON.stringify(this.saveCountArray));
      } else {
        let obj = {transport_id, unit_id: this.unit_id, day_id: this.unit_id2, value: 1};
        this.saveCountArray.push(obj);
        localStorage.setItem("CountArray", JSON.stringify(this.saveCountArray));
      }
    }
    let getCheck = JSON.parse(localStorage.getItem("CountArray"));
    getCheck.map(report => {
      let findIndex = this.transArray.findIndex(trans => trans.transport_id == report.transport_id);
      if (findIndex >= 0) {
        this.transArray[findIndex].value = report.value
      }
    })
    console.log(this.saveCountArray);
  }

  decreaseCount(transport_id) {
    if (localStorage.getItem("CountArray") != null) {
      this.saveCountArray = JSON.parse(localStorage.getItem("CountArray"));
    } else {
      this.saveCountArray = [];
    }
    let findIndex = this.saveCountArray.findIndex(trans => trans.transport_id == transport_id);
    console.log(findIndex);
    if (findIndex >= 0) {
      if ( this.saveCountArray[findIndex].value == 0) {
        return;
      } else {
        this.saveCountArray[findIndex].value = this.saveCountArray[findIndex].value-=1;
        localStorage.setItem("CountArray", JSON.stringify(this.saveCountArray));
      }
    }
    console.log(this.saveCountArray);
  }


}


