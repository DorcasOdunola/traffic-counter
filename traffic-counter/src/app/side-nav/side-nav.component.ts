import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, withLatestFrom, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})

export class SideNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(private breakpointObserver: BreakpointObserver, public router: Router, public userService: UserService){}
    
  public width = 0;
  public getName;
  public getUserDetails;
  public admin;
  public panelOpenState = false;
  public image;
  ngOnDestroy(){
    window.removeEventListener("resize", null)
  }

  ngOnInit(): void {
    window.addEventListener("resize", ()=>{
      this.width = window.innerWidth;
    })
    this.getUserDetails = JSON.parse(localStorage.getItem("trafficUserDet"));
    if (this.getUserDetails.status == "Admin") {
     this.admin = true;
    } else {
      this.admin = false;
    }

    this.userService.getProfile().subscribe(data => {
      this.image = this.image = `http://localhost/trafficCounter/backend/uploads/${data.image}`;
    })
  }

  // hideSidenavAfterClick() {
  //   if (window.innerWidth <= 768) {
  //     this.sidenav.close();
  //   }
  // }

  getFirstName() {
    this.getUserDetails = JSON.parse(localStorage.getItem("trafficUserDet"));
    this.getName = this.getUserDetails.first_name;
    // this.getName = JSON.parse(localStorage.getItem("userFirstName"));
    this.router.navigate([`/profile/${this.getName}`])
   }
}
