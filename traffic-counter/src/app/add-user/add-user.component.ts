import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { UnitService } from '../services/unit.service';
import { UserService } from '../services/user.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(public userService: UserService, public formBuilder: FormBuilder, public unitService: UnitService, public snackbar: MatSnackBar) { }
  public unitArray = [];
  public userForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    surname: [''],
    email: [''],
    phoneNo: [''],
    address: [''],
    password: [''],
    status: [''],
    unitId: [''],
  })


  ngOnInit(): void {
    this.unitService.getUnit().subscribe(data => {
      this.unitArray = data;
    })
  }

  addUser() {
    let userObj = this.userForm.value;
    this.userService.addUser(userObj).subscribe(response => { 
      console.log(response);
      if (response.inserted == true) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: {message: "User sucessfully Created"},
          duration: 3000
        })
        this.userForm.controls['firstName'].setValue("");
        this.userForm.controls['lastName'].setValue("");
        this.userForm.controls['surname'].setValue("");
        this.userForm.controls['email'].setValue("");
        this.userForm.controls['phoneNo'].setValue("");
        this.userForm.controls['address'].setValue("");
        this.userForm.controls['password'].setValue("");
        this.userForm.controls['status'].setValue("");
        this.userForm.controls['unitId'].setValue("");
      } else {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: {message: "Unable to create user"},
          duration: 3000
        })        
      }
    })
  }

}
