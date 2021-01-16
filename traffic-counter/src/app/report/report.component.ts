import { Component, OnInit } from '@angular/core';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(public unitService: UnitService) { }

  public noOfUnit = "";

  ngOnInit(): void {
    this.getAllUnit();
  }

  getAllUnit() {
    this.unitService.getUnit().subscribe(data => {
      this.noOfUnit = data.length;
    })
  }

}
