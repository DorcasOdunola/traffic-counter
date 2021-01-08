import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetpassDialogComponent } from '../resetpass-dialog/resetpass-dialog.component';
import { LoginService } from '../services/login.service';
import { UnitService } from '../services/unit.service';
import { UserService } from '../services/user.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(public userService: UserService, public formBuilder: FormBuilder, public unitService: UnitService, public snackbar: MatSnackBar, public dialog: MatDialog) { }
  public disabled = true;
  public userForm = this.formBuilder.group({
    firstName: ['',],
    lastName: [''],
    surname: [''],
    email: [''],
    phoneNo: [''],
    address: [''],
    status: [''],
    unitId: [''],
  })

  public img = ""
  public showEdit = true;
  public showSave = false;
  public image: any = {};
  public uploadData = new FormData();
  public unitArray = [];

  ngOnInit(): void {
    this.unitService.getUnit().subscribe(data => {
      this.unitArray = data;
    })
    this.userService.getProfile().subscribe(data => {
      this.userForm.controls["firstName"].setValue(data.first_name);
      this.userForm.controls["lastName"].setValue(data.last_name);
      this.userForm.controls["surname"].setValue(data.surname);
      this.userForm.controls["email"].setValue(data.email);
      this.userForm.controls["phoneNo"].setValue(data.phone_number);
      this.userForm.controls["address"].setValue(data.address);
      this.userForm.controls["status"].setValue(data.status);
      this.userForm.controls["unitId"].setValue(data.unit_id);
      this.image = `http://localhost/trafficCounter/backend/uploads/${data.image}`;
    })
    this.userForm.disable();
  }

  clickImg() {
    document.getElementById('forPicture').click()
  }

  uploadImg(event) {
    console.log(event.target.value);
   this.uploadData.append('file', event.target.files[0]);
    console.log(this.uploadData);
    this.userService.uploadImg(this.uploadData).subscribe(data => {
      if (data.inserted == true) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: {message: "Image Uploaded Successfully"},
          duration: 3000
        })
      } else {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: {message: "Unable to update Profile Picture"},
          duration: 3000
        })
      }
      console.log(data);
    })
  }

  editProfile(event) {
    // console.log(event)
    if (this.showEdit) {
        this.showSave = true;
        this.showEdit = false;
        this.userForm.enable();
        console.log(this.userForm.value);
    } else {
      this.showEdit = true;
      this.showSave = false;
      this.userForm.disable();
      let userObj= this.userForm.value;
      this.userService.editUser(userObj).subscribe(data => {
        if (data.edited == true) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: {message: "Profile Successfully Edited"},
            duration: 3000
          })
        } else {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: {message: "Unable to edit Profile"},
            duration: 3000
          })
        }
      })
    }
  }
  
  resetPassword () {
    let dialog= this.dialog.open(ResetpassDialogComponent, {
      width: '400px'
    })
    dialog.afterClosed().subscribe(data => {
      if (data == "") { 
        return;
      } else {
        this.userService.resetPassword(data).subscribe(response => {
          if (response.updated == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: {message: "Password Successfully updated"},
              duration: 3000
            })
          } else {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: {message: "Unable to reset passowrd"},
              duration: 3000
            })
          }
        })
      }
    })
  }
}

