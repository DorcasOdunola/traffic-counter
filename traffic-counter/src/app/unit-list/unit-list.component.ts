import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { EditunitDialogComponent } from '../editunit-dialog/editunit-dialog.component';
import { UnitService } from '../services/unit.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  constructor(public unitService: UnitService, public bottomSheet: MatBottomSheet, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  public unitArray = [];
  public unitSearch = "";
  public seen = false;
  
  ngOnInit(): void {
    this.unitService.getUnit().subscribe(data => {
      this.unitArray = data;
      this.seen = true;
    })
  }
  
  editUnit(unit_id, name, address, initials, status, count_interval) {
    let dialog = this.dialog.open(EditunitDialogComponent, {
      width: '600px',
      data: {unit_id, name, address, initials, status, count_interval}
    })
    dialog.afterClosed().subscribe(result => {
      if (!result) {
        return;
      } else {
        this.unitService.editUnit(result).subscribe(data => {
          this.unitService.getUnit().subscribe(data => {
            this.unitArray = data;
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {message: "Edited"},
            duration: 3000
         })
        })
      }
    })
  }

  deleteUnit(unit_id) {
    let bottomSheet = this.bottomSheet.open(BottomSheetComponent, {
      data: {message: "Do you really want to delete this unit?"}
    })
    bottomSheet.afterDismissed().subscribe(result => {
      if (result == false) {
        return
      }else if (result == true) {
        this.unitService.deleteUnit(unit_id).subscribe(data => {
          console.log(data);
          if (data.deleted == false) {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {message: "Unable to delete unit because some transport means and staff are attached to this unit."},
              duration: 3000
           })
          } else {
            this.unitService.getUnit().subscribe(data => {
              this.unitArray = data;
            })
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {message: "Deleted"},
              duration: 3000
           })
          }
        })
      }
    })
  }

  sendUnitDetails(unit) {
    this.unitService.unitObj.next(unit)
  }
}
