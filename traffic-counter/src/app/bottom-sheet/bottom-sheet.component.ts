import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {message: string}, public bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) { }

  ngOnInit(): void {
  }
  closeBottomSheetYes() {
    this.bottomSheetRef.dismiss(true);
  }

  closeBottomSheetNO() {
    this.bottomSheetRef.dismiss(false);
  }

}
