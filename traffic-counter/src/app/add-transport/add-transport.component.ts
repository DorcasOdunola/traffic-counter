import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { TransportService } from '../services/transport.service';
import { UnitService } from '../services/unit.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.css']
})
export class AddTransportComponent implements OnInit {

  constructor(public unitService: UnitService, public transportService: TransportService, public snackBar: MatSnackBar) { }

  public unitArray = [];
  public transName = "";
  public transDesc = "";
  public unitId = "";
  public imgFile = "";
  public uploadFile = new FormData;
  ngOnInit(): void {
    this.unitService.getUnit().subscribe(data => {
      this.unitArray = data;
    })
  }

  addTransport() {
    console.log(this.imgFile);
    console.log(this.transName);
    console.log(this.transDesc);
    console.log(this.unitId);
    if (this.imgFile == "" || this.transName == "" || this.transDesc == "" || this.unitId == "") {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {message: "Provide Transport Means Details"},
        duration: 3000
      })
    } else {
      this.uploadFile.append('file', this.imgFile);
      this.uploadFile.append('transName', this.transName);
      this.uploadFile.append('transDesc', this.transDesc);
      this.uploadFile.append('unit_id', this.unitId);
      this.transportService.addTrans(this.uploadFile).subscribe(data => {
        if (data.success == true) {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {message: "Transport means successfully Created!!"},
            duration: 3000
          })
          this.transName = "";
          this.transDesc = "";
          this.unitId = "";
        } else {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {message: "This Transport means already exist in this unit!"},
            duration: 3000
          })
        }
      })
    }
  }

  changeTransPic(event) {
    this.imgFile = event.target.files[0];
  }

}
