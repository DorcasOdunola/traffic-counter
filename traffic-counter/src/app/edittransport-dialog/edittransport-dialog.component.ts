import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edittransport-dialog',
  templateUrl: './edittransport-dialog.component.html',
  styleUrls: ['./edittransport-dialog.component.css']
})
export class EdittransportDialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EdittransportDialogComponent>) { }

  public transName = "";
  public transDesc = "";
  public imgFile = "";

  ngOnInit(): void {
    this.transName = this.data.trans_name;
    this.transDesc = this.data.trans_desc;
  }

  editTransport() {
    if (this.imgFile == "") {
      this.imgFile = this.data.trans_img;
      let transObj = {trans_id: this.data.trans_id, trans_name: this.transName, trans_desc: this.transDesc, imgFile: this.imgFile};
      this.dialogRef.close(transObj);
    } else {
      let transObj = {trans_id: this.data.trans_id, trans_name: this.transName, trans_desc: this.transDesc, imgFile: this.imgFile};
      this.dialogRef.close(transObj);
    }
  }

  changeTransPic(event) {
    this.imgFile = event.target.files[0];
  }

}
