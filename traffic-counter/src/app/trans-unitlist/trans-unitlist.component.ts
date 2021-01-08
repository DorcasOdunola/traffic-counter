import { Component, OnInit } from '@angular/core';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-trans-unitlist',
  templateUrl: './trans-unitlist.component.html',
  styleUrls: ['./trans-unitlist.component.css']
})
export class TransUnitlistComponent implements OnInit {

  constructor(public unitService: UnitService) { }

  public unitArray = [];
  ngOnInit(): void {
    this.unitService.getUnit().subscribe(data => {
     this.unitArray = data;
    })
  }

  updateUnitId(unit_id, unit_name) {
    this.unitService.unitId.next(unit_id);
    this.unitService.unitName.next(unit_name);
  }

}
