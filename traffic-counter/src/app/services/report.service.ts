import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public baseUrl = environment.baseUrl;
  
  constructor(public httpClient: HttpClient) { }

  public saveReport(obj) {
   return this.httpClient.post<any>(`${this.baseUrl}SaveReport.php`, obj)
  }

  public getAllReport(unit_id) {
    return this.httpClient.post<any>(`${this.baseUrl}GetAllReport.php`, unit_id)
  }

  public getReportPerUnit(dateObj) {
    return this.httpClient.post<any>(`${this.baseUrl}GetReportPerUnit.php`, dateObj)
  }

  public getReportPerRange(dateObj) {
    return this.httpClient.post<any>(`${this.baseUrl}GetReportPerRange.php`, dateObj)
  }
}
