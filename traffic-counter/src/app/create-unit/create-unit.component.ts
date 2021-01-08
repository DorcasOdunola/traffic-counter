import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { UnitService } from '../services/unit.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent implements OnInit {

  constructor(public service: UnitService, public snackBar: MatSnackBar) { }

  public unitName = "";
  public unitAddress = "";
  public unitInitial = "";
  public unitStatus= "";

  ngOnInit(): void {

  }

  createUnit() {
    if ((this.unitName == "" || this.unitAddress == "" || this.unitInitial == "" || this.unitStatus == "") || this.unitName == "" && this.unitAddress == "" && this.unitInitial == "" && this.unitStatus == "") {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {message: "Provide Unit Details!!!"},
        duration: 3000
      })
    } else {
      let unitObj = {unitName: this.unitName, unitAddress: this.unitAddress, unitInitial: this.unitInitial, unitStatus: this.unitStatus}
      this.service.createUnit(unitObj).subscribe(data => {
        console.log(data);
        if (data.inserted == true) {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {message: "Unit Successfully Created"},
            duration: 3000
          })
          this.unitName = "";
          this.unitAddress = "";
          this.unitInitial = "";
          this.unitStatus = "";
        } else {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {message: "This unit already exist"},
            duration: 3000
          })
        }
      })
    }
  }

}
