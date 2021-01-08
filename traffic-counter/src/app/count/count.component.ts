import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {

  constructor(public transService: TransportService, public reportService: ReportService) { }

  public userDetails:any = {};
  public transArray: any = [];
  public unit_name;
  public unit_date;
  public unit_time;
  public info = "";
  public unit_id = "";
  public user_id = "";
  public value;
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
      }
    })
    this.getDetails();
    this.getTimeDate();
    this.getAllReport();
    // setInterval(function() {
    //   this.getTimeDate()
    // }, 1000)
  }
  getAllReport() {
    this.reportService.getAllReport(this.unit_id).subscribe(data => {
      this.value = data.length;
      console.log(data);
    })
  }
  getDetails() {
    let date = new Date();
    this.unit_date = date.toLocaleDateString();
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

  sendReport(transport_id) {
    let obj = {unit_id: this.unit_id, transport_id: transport_id, user_id: this.user_id}
    console.log(obj);
    this.reportService.saveReport(obj).subscribe(data => {
      console.log(data);
    })
  }
}
