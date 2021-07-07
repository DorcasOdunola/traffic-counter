import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module'
import { RegisterUnitComponent } from './register-unit/register-unit.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTransportComponent } from './add-transport/add-transport.component';
import { ReportComponent } from './report/report.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CountComponent } from './count/count.component';
import { UsersListComponent } from './users-list/users-list.component';
import { EditprofileDialogComponent } from './editprofile-dialog/editprofile-dialog.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SearchUserPipe } from './pipes/search-user.pipe';
import { UnitListComponent } from './unit-list/unit-list.component';
import { EditunitDialogComponent } from './editunit-dialog/editunit-dialog.component';
import { SearchUnitPipe } from './pipes/search-unit.pipe';
import { TransportListComponent } from './transport-list/transport-list.component';
import { EdittransportDialogComponent } from './edittransport-dialog/edittransport-dialog.component';
import { SearchTransportPipe } from './pipes/search-transport.pipe';
import { ResetpassDialogComponent } from './resetpass-dialog/resetpass-dialog.component';
import { UnitReportComponent } from './unit-report/unit-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUnitComponent,
    SignupComponent,
    DashboardComponent,
    LoginDialogComponent,
    AdminProfileComponent,
    CreateUnitComponent,
    AddUserComponent,
    AddTransportComponent,
    ReportComponent,
    SideNavComponent,
    UsersListComponent,
    CountComponent,
    EditprofileDialogComponent,
    BottomSheetComponent,
    SnackbarComponent,
    SearchUserPipe,
    UnitListComponent,
    EditunitDialogComponent,
    SearchUnitPipe,
    TransportListComponent,
    EdittransportDialogComponent,
    SearchTransportPipe,
    ResetpassDialogComponent,
    UnitReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
