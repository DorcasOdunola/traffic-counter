import { Component, Input, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-unit-report',
  templateUrl: './unit-report.component.html',
  styleUrls: ['./unit-report.component.css']
})
export class UnitReportComponent implements OnInit {
  @Input() unit_id = "";

  constructor(public reportService: ReportService) { }

  public unitArray = [];
  public number: number = 0;
  public filtered = [];
  ngOnInit(): void {
    this.getReportPerUnit();
  }

  ngOnChanges() {
    this.getTotalCount();
  }

  getReportPerUnit() {
    // this.reportService.getReportPerUnit().subscribe(data => {
    //   this.unitArray = data;
    //   this.number = 0;
    //   this.getTotalCount();
    // })
  }

  getTotalCount() {
    let filteredUnit = this.unitArray.filter(report => report.unit_id == this.unit_id);
    console.log(filteredUnit)
    if (filteredUnit.length == 0) {
        this.number = 0;
        this.filtered = filteredUnit;
    } else {
      this.number = 0;
      filteredUnit.map(unit => {
        this.number =  this.number+ Number(unit.value);
      })
      this.filtered = filteredUnit;
    }
    console.log(this.number);
  }

}
