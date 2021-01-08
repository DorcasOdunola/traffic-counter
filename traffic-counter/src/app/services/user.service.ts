import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }
  public baseUrl = environment.baseUrl;

  public loginUser(obj) {
    return this.http.post<any>(`${this.baseUrl}Login.php`, obj);
  }

   public getProfile() {
    return this.http.get<any>(`${this.baseUrl}UserProfile.php`);
  }

  public uploadImg(img) {
    return this.http.post<any>(`${this.baseUrl}UploadImg.php`, img);
  }

  public addUser(userObj) {
    return this.http.post<any>(`${this.baseUrl}CreateUser.php`, userObj);
  }

  public editUser(userObj) {
    return this.http.post<any>(`${this.baseUrl}EditProfile.php`, userObj);
  }

  public getAllUser() {
    return this.http.get<any>(`${this.baseUrl}SelectAllUser.php`);
  }

  public deleteUser(user_id) {
    return this.http.post<any>(`${this.baseUrl}DeleteUser.php`, user_id);
  }

  public updateUserProfile(userObj) {
    return this.http.post<any>(`${this.baseUrl}EditUserProfile.php`, userObj)
  }

  public resetPassword(obj) {
    return this.http.post<any>(`${this.baseUrl}ResetPassword.php`, obj)
  }
}
