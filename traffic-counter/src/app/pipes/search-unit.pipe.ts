import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUnit'
})
export class SearchUnitPipe implements PipeTransform {

  transform(unitArray: any[], unitSearch: any): unknown {
    unitSearch = unitSearch.toLowerCase();
    if (!unitSearch) return unitArray
    let filteredUnit = unitArray.filter(unit => 
      unit.name.toLowerCase().includes(unitSearch) ||
      unit.address.toLowerCase().includes(unitSearch) ||
      unit.initials.toLowerCase().includes(unitSearch) ||
      unit.status.toLowerCase().includes(unitSearch))
    return filteredUnit;
  }

}
