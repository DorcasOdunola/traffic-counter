import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-editprofile-dialog',
  templateUrl: './editprofile-dialog.component.html',
  styleUrls: ['./editprofile-dialog.component.css']
})
export class EditprofileDialogComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditprofileDialogComponent>, public unitService: UnitService) { }
  public unitArray = [];
  public userForm = this.formBuilder.group({
    user_id:[''],
    firstName: ['',],
    lastName: [''],
    surname: [''],
    email: [''],
    phoneNo: [''],
    address: [''],
    status: [''],
    unitId: [''],
  })

  ngOnInit(): void {
    this.userForm.controls["user_id"].setValue(this.data.user_id); 
    this.userForm.controls["surname"].setValue(this.data.surname); 
    this.userForm.controls["firstName"].setValue(this.data.first_name); 
    this.userForm.controls["lastName"].setValue(this.data.last_name); 
    this.userForm.controls["email"].setValue(this.data.email); 
    this.userForm.controls["phoneNo"].setValue(this.data.phone_number);
    this.userForm.controls["address"].setValue(this.data.address);  
    this.userForm.controls["status"].setValue(this.data.user_status);
    this.userForm.controls["unitId"].setValue(this.data.unit_id);
    this.unitService.getUnit().subscribe(data => {
      this.unitArray = data;
    })
  }

  saveProfile() {
    this.dialogRef.close(this.userForm.value)
  }

}
