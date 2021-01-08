import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public http: HttpClient, public router: Router) { }

  public userForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    surname: [''],
    email: [''],
    phoneNo: [''],
    address: ['']
  })

  ngOnInit(): void {

  }

  createUser() {
    console.log(this.userForm.value);
    this.http.post<any>("http://localhost/trafficCounter/backend/createuser.php", this.userForm.value).subscribe(data => {
      if (data.inserted == true) {
        this.router.navigate(['/profile']);        
      } else {
        alert("ni");
      }
    })
  }

}
