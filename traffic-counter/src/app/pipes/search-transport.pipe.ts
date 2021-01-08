import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTransport'
})
export class SearchTransportPipe implements PipeTransform {

  transform(transportArray: any[], transportSearch: any): unknown {
    transportSearch = transportSearch.toLowerCase();
    if (!transportSearch) return transportArray;
    let filteredTrans = transportArray.filter(trans => 
      trans.transport_name.toLowerCase().includes(transportSearch) ||
      trans.transport_desc.toLowerCase().includes(transportSearch)
      )
    return filteredTrans;
  }

}
