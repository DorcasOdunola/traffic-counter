import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { DayService } from '../services/day.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http: HttpClient, public service: UserService, public router: Router, public dayService: DayService) { }
  public dbResponse = {empty: false};
  public email = "";
  public password = "";
  public incorrect = "";

  ngOnInit(): void {

  }
  

  login() {
    if ((this.email == "" && this.password == "") || (this.email == "" && this.password == "") ) {
      this.incorrect = "Pls provide the neccessary details!!!."
    } else {
      let obj = {email: this.email, password: this.password};
      this.service.loginUser(obj).subscribe(data => {
        if (data.userDetails == true) {
          localStorage.setItem('trafficToken', data.token);
          let obj = {first_name: data.details.first_name, status: data.details.user_status, user_id: data.details.user_id, unit_id: data.details.unit_id, unit_name:data.details.unit_name};
          localStorage.setItem("trafficUserDet", JSON.stringify(obj));
          localStorage.setItem("userFirstName", JSON.stringify(data.firstName));
          this.router.navigate(["/dashboard"]);
          // let dayObj = {};
          // this.dayService.sendDay(obj).subscribe(res => {
          //   console.log(res);
          // })

        } else {
          this.incorrect = data.message;
        }
      })
    }
  }
}
