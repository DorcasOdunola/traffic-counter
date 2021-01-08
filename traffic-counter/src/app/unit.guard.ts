import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UnitGuard implements CanActivate {
  constructor (public service: LoginService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.service.checkDb().subscribe(data => {
       if (data.empty == true) {
         this.router.navigate(['/registerunit']);
       } 
      })
      return true;
      
  }
  
}
