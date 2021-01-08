import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resetpass-dialog',
  templateUrl: './resetpass-dialog.component.html',
  styleUrls: ['./resetpass-dialog.component.css']
})
export class ResetpassDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResetpassDialogComponent>) { }

  public password: string = "";
  public conpassword: string = "";
  public info: string = "";

  ngOnInit(): void {

  }

  sendPassword() {
    if (this.password != this.conpassword) {
      this.info = "Password must be the same!"
    } else {
      let passwordObj = {password: this.password, conPassword: this.conpassword};
      this.info = "";
      this.dialogRef.close(passwordObj);
    }
  }

}
