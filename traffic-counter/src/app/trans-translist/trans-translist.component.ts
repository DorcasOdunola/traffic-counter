import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { EdittransportDialogComponent } from '../edittransport-dialog/edittransport-dialog.component';
import { TransportService } from '../services/transport.service';
import { UnitService } from '../services/unit.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-trans-translist',
  templateUrl: './trans-translist.component.html',
  styleUrls: ['./trans-translist.component.css']
})
export class TransTranslistComponent implements OnInit {

  constructor(public unitService: UnitService, public transportService: TransportService, public bottomSheet: MatBottomSheet, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  public unit_id = undefined; 
  public transportArray = [];
  public seen = false;
  public transportSearch = "";
  public unit_name: any;
  public uploadFile = new FormData;
  ngOnInit(): void {
    this.unitService.unitId.subscribe(data => {
      this.unit_id = data;
      this.transportService.getTrans(data).subscribe(backData => {
        console.log(backData)
        if (backData.message != "no transport means") {
          this.seen = true;
          this.transportArray = backData;
        } else {
          this.seen = false;
          this.unitService.unitName.subscribe(data => {
            console.log(data);
            if (data == String) {
              this.unit_name = ""
            } else {
              this.unit_name = data;
            }
          })
        }
      })
    })
  }

  deleteTransport(trans_id) {
   let bottomSheet = this.bottomSheet.open(BottomSheetComponent, {
    data: {message: "Do you really want to delete this transport means?"}
  })
  bottomSheet.afterDismissed().subscribe(result => {
    console.log(result);
    if (result == false) {
      return
    }else if (result == true) {
      this.transportService.deleteTrans(trans_id).subscribe(data => {
        console.log(data);
        if (data.deleted == false) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: {message: "Unable to Delete"},
            duration: 3000
         })
        } else {
          this.transportService.getTrans(this.unit_id).subscribe(data => {
            this.transportArray = data;
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

  editTransport(trans_id, trans_name, trans_desc, trans_img) {
    let dialog = this.dialog.open(EdittransportDialogComponent, {
      data: {trans_id, trans_name, trans_desc, trans_img},
      width: '500px'
    })
    dialog.afterClosed().subscribe(result => {
      this.uploadFile.append('file', result.imgFile);
      this.uploadFile.append('transName', result.trans_name);
      this.uploadFile.append('transDesc', result.trans_desc);
      this.uploadFile.append('trans_id', result.trans_id);
      this.transportService.editTrans(this.uploadFile).subscribe(data => {
        if (data.edited == true) {
          this.transportService.getTrans(this.unit_id).subscribe(backData => {
            console.log(backData)
            if (backData.message != "no transport means") {
              this.seen = true;
              this.transportArray = backData;
            } else {
              this.seen = false;
            }
          })
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: {message: "Edited"},
            duration: 3000
         })
        } else {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: {message: "Unable to Edit"},
            duration: 3000
         })
        }
      })
    })
  }
}

