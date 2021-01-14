import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(public httpClient: HttpClient) { }

  public baseUrl = environment.baseUrl;

  public sendDay(obj) {
    return this.httpClient.post<any>(`${this.baseUrl}InsertDay.php`, obj)
  }

  public getDay(dayObj){
    return this.httpClient.post<any>(`${this.baseUrl}GetDay.php`, dayObj)
  }
}
