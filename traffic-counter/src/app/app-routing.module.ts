import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterUnitComponent } from './register-unit/register-unit.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTransportComponent } from './add-transport/add-transport.component';
import { ReportComponent } from './report/report.component';
import { UnitGuard } from './unit.guard';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AdminGuard } from './guards/admin.guard';
import { CountComponent } from './count/count.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { TransportListComponent } from './transport-list/transport-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [UnitGuard]},
  {path: 'registerunit', component: RegisterUnitComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: SideNavComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile/:firstname', component: AdminProfileComponent},
    {path: 'createunit', component: CreateUnitComponent, canActivate: [AdminGuard]},
    {path: 'adduser', component: AddUserComponent, canActivate: [AdminGuard]},
    {path: 'count', component: CountComponent},
    {path: 'addtransport', component: AddTransportComponent, canActivate: [AdminGuard]},
    {path: 'alluser', component: UsersListComponent, canActivate: [AdminGuard]},
    {path: 'allunit', component: UnitListComponent, canActivate: [AdminGuard]},
    {path: 'allunit/:unit_id', component: TransportListComponent, canActivate: [AdminGuard]},
    {path: 'report', component: ReportComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
