import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:  HttpClient) { }

  public baseUrl = "http://localhost/trafficCounter/backend/";

  public checkDb() {
    return this.http.get<any>(`${this.baseUrl}Checkdb.php`);
  }

//  public loginUser(obj) {
//     return this.http.post<any>(`${this.baseUrl}login.php`, obj);
//   }

  // public getProfile() {
  //   return this.http.get<any>(`${this.baseUrl}UserProfile.php`);
  // }

  // public createUnit(unitObj) {
  //   return this.http.post<any>(`${this.baseUrl}CreateUnit.php`, unitObj);
  // }

  // public getUnit() {
  //   return this.http.get<any>(`${this.baseUrl}GetAllUnit.php`);
  // }

  // public addUser(userObj) {
  //   return this.http.post<any>(`${this.baseUrl}CreateUser.php`, userObj)
  // }

  // public addTrans(transObj) {
  //   return this.http.post<any>(`${this.baseUrl}AddTrans.php`, transObj)
  // }
}
