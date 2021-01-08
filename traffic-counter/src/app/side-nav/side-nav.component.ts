import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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

  constructor(private breakpointObserver: BreakpointObserver, public router: Router, public userService: UserService) {}

  public getName;
  public getUserDetails;
  public admin;
  public panelOpenState = false;
  public image;
  ngOnInit(): void {
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

  getFirstName() {
    this.getUserDetails = JSON.parse(localStorage.getItem("trafficUserDet"));
    this.getName = this.getUserDetails.first_name;
    // this.getName = JSON.parse(localStorage.getItem("userFirstName"));
    this.router.navigate([`/profile/${this.getName}`])
   }
}
