import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { LoginService } from '../services/login.service';
import { UnitService } from '../services/unit.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-register-unit',
  templateUrl: './register-unit.component.html',
  styleUrls: ['./register-unit.component.css']
})
export class RegisterUnitComponent implements OnInit {

  constructor(public unitService: UnitService, public router: Router, public formBuilder: FormBuilder, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  public isLinear: boolean = true;
  public unitForm = this.formBuilder.group({
    unitName: ['', [Validators.required]],
    unitAddress: ['', [Validators.required]],
    unitStatus: ['', [Validators.required]],
    unitInitial: ['', [Validators.required]]
  })
  public userForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['',[Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phoneNo: ['', [Validators.required]],
    address: ['', [Validators.required]],
    password: ['', [Validators.required]],
    conpassword: ['', [Validators.required]]
  })
  public unitId;
  public progressbar = false;
 

  ngOnInit(): void {
  }

  createUnit() {
    if (this.userForm.controls["password"].value == this.userForm.controls["conpassword"].value) {
      this.progressbar = true;
      let myObj = {unit: this.unitForm.value, user: this.userForm.value};
      this.unitService.postUnit(myObj).subscribe(data => {
        console.log(data);
        if (data.inserted == true) {
          this.dialog.open(LoginDialogComponent, {
            data: {unitId: data.unitId, unitInitial: data.unitInitial, unitName: data.unitName, userName: data.userName, userId: data.userId}
          })
          this.progressbar = false;
        } else {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {message: "Unable to create unit and user, please try again!"},
            duration: 3000
          })
        }
      })
    } else {
      alert("Password must be the same!!!");
    }
    
  //  let myobj = {unitName: this.unitName, unitAddress: this.unitAddress, unitInitial: this.unitInitial, unitStatus: this.unitStatus}
  //  console.log(myobj);
  //   this.service.postUnit(myobj).subscribe(data => {
  //     console.log(data);
  //     if (data.inserted == true) {
  //       this.router.navigate(["/signup"]);
  //     } else {
  //       alert("Error registering Unit!!!");
  //     }
  //   })
  }

}
