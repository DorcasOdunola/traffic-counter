import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

//  interface dataInterface {
//   inserted: Boolean;
//   unitId: Number;
//   unitInitial: String;
//   unitName: String;
//   userName: String;
//   userId: Number
// }
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}, public router: Router) { }

  public dataObj;

  ngOnInit(): void {
    console.log(this.data);
    this.dataObj = this.data;
  }

  login() {
    this.dialogRef.close();
    this.router.navigate(["/login"]);
  }

}
