import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(public http: HttpClient) { }

  public baseUrl = environment.baseUrl;

  public addTrans(transObj) {
    return this.http.post<any>(`${this.baseUrl}AddTrans.php`, transObj)
  }

  public getTrans(unit_id) {
    return this.http.post<any>(`${this.baseUrl}GetAllTransport.php`, unit_id)
  }

  public deleteTrans(trans_id) {
    return this.http.post<any>(`${this.baseUrl}DeleteTransport.php`, trans_id)
  }

  public editTrans(transObj) {
    return this.http.post<any>(`${this.baseUrl}EditTransport.php`, transObj)
  }
}
