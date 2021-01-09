import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { EditprofileDialogComponent } from '../editprofile-dialog/editprofile-dialog.component';
import { UserService } from '../services/user.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(public userService: UserService, public formBuilder: FormBuilder, public dialog: MatDialog, public bottomSheet: MatBottomSheet, public snackbar: MatSnackBar) { }

  public userArray = [];
  public userObj: any;
  public seen = false;
  public userSearch = "";
  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data => {
      this.userArray = data;
      this.seen = true;
    })
  }

  deleteUser(user_id) {
    let bottomSheet = this.bottomSheet.open(BottomSheetComponent, {
      data: {message: "Do you really want to delete this user?"}
    })
    bottomSheet.afterDismissed().subscribe(result => {
      if (result == false) {
        return;
      } else if (result == true) {
        this.userService.deleteUser(user_id).subscribe(data => {
          if (data.deleted == false) {
            return
          } else {
            this.userService.getAllUser().subscribe(data => {
              this.userArray = data;
            })
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: {message: "Deleted"},
              duration: 3000
            })
          }
        })
      }
    })
  }

  editUser(user_id, surname, first_name, last_name, email, address, user_status, phone_number, unit_id) {
   let obj = {user_id, surname, first_name, last_name, email, address, user_status, phone_number, unit_id}
   let dialog =  this.dialog.open(EditprofileDialogComponent, {
      data: obj,
      width: '600px',
      height: '60vh'
    });
    dialog.afterClosed().subscribe(result => {
      this.userObj = result;
      if (result == "") {
        return
      }
      this.userService.updateUserProfile(this.userObj).subscribe(data => {
        this.userService.getAllUser().subscribe(data => {
          this.userArray = data;
        })
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: {message: "Edited"},
          duration: 3000
        })
      })
    })
  }

}
