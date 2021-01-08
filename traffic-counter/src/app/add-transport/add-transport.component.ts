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
  ngOnInit(): void {
    this.unitService.getUnit().subscribe(data => {
      this.unitArray = data;
    })
  }

  addTransport() {
    let transObj = {transName: this.transName, transDesc: this.transDesc, unitId: this.unitId};
    this.transportService.addTrans(transObj).subscribe(data => {
      console.log(data);
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
