import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(public http: HttpClient) { }

  public baseUrl = environment.baseUrl;
  public unitId = new BehaviorSubject(String);
  public unitName = new BehaviorSubject(String);

  public postUnit(myobj) {
    return this.http.post<any>(`${this.baseUrl}Postunit.php`, myobj)
  }

  public createUnit(unitObj) {
    return this.http.post<any>(`${this.baseUrl}CreateUnit.php`, unitObj);
  }

  public getUnit() {
    return this.http.get<any>(`${this.baseUrl}GetAllUnit.php`);
  }

  public deleteUnit(unit_id) {
    return this.http.post<any>(`${this.baseUrl}DeleteUnit.php`, unit_id);
  }

  public editUnit(unitObj) {
    return this.http.post<any>(`${this.baseUrl}EditUnit.php`, unitObj);
  }

  
}
