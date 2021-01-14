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
  public savedTransArray = [];
  public unit_name;
  public date;
  public unit_time;
  public info = "";
  public unit_id = "";
  public user_id = "";
  public value;
  public unit_id2 = "";
  public
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("trafficUserDet"));
    this.unit_id = this.userDetails.unit_id;
    this.unit_name = this.userDetails.unit_name;
    this.user_id = this.userDetails.user_id;
    this.transService.getTrans(this.unit_id).subscribe(data => {
      if (data.message == "no transport means") {
        this.info = `No Transport Means for Counting in ${this.unit_name} Unit!!!`
      } else {
        this.transArray = data;
        this.info = "";
        console.log(this.transArray);
      }
    })
    this.getDetails();
    this.getTimeDate();
    // this.getAllReport();
    let dayObj = {unit_id: this.unit_id, day: this.date};
    this.dayService.getDay(dayObj).subscribe(data => {
      data.map(date => {
        this.unit_id2 = date.day_id;
      })
      console.log(this.unit_id2);
    })
  }
  // setInterval(() => {
  //   this.getTimeDate()
  // }, 1000)

  getAllReport() {
    this.reportService.getAllReport(this.unit_id).subscribe(data => {
      this.value = data.length;
      console.log(data);
    })
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
    if (localStorage.getItem("TransArray") != null) {
      this.savedTransArray = JSON.parse(localStorage.getItem("TransArray"));
    } else {
      this.savedTransArray = [];
    }
    if (this.savedTransArray == []) {
      let obj = {transport_id, unit_id: this.unit_id, day_id: this.unit_id2, value: 1};
      this.savedTransArray.push(obj);
    } else {
      let findIndex = this.savedTransArray.findIndex(trans => trans.transport_id == transport_id);
      console.log(findIndex);
      if (findIndex >= 0) {
        this.savedTransArray[findIndex].value = this.savedTransArray[findIndex].value+=1;
        localStorage.setItem("TransArray", JSON.stringify(this.savedTransArray));
      } else {
        let obj = {transport_id, unit_id: this.unit_id, day_id: this.unit_id2, value: 1};
        this.savedTransArray.push(obj);
        localStorage.setItem("TransArray", JSON.stringify(this.savedTransArray));
      }
    }
    console.log(this.savedTransArray);
  }

  sendReport(transport_id) {
    let obj = {unit_id: this.unit_id, transport_id: transport_id, user_id: this.user_id}
    console.log(obj);
    this.reportService.saveReport(obj).subscribe(data => {
      console.log(data);
    })
  }

}
// setTimeout(() => {
//   alert("hi");
// }, 5000);
