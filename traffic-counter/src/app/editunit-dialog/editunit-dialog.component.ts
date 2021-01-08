import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editunit-dialog',
  templateUrl: './editunit-dialog.component.html',
  styleUrls: ['./editunit-dialog.component.css']
})
export class EditunitDialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditunitDialogComponent>) { }

  public unit_id = "";
  public unitName = "";
  public unitAddress = "";
  public unitInitial = "";
  public unitStatus= "";
  ngOnInit(): void {
    this.unit_id = this.data.unit_id;
    this.unitName = this.data.name;
    this.unitAddress = this.data.address;
    this.unitInitial = this.data.initials;
    this.unitStatus = this.data.status;
  }

  saveUnit() {
    let unitObj = {unit_id: this.unit_id, name: this.unitName, address: this.unitAddress, initial: this.unitInitial, status: this.unitStatus};
    this.dialogRef.close(unitObj);
  }

}
