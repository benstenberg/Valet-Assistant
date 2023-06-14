import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EntryComponent } from './components/entry/entry.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { ClientstatusComponent } from './components/clientstatus/clientstatus.component';
import { HomeComponent } from './components/home/home.component';
import { NewparkComponent } from './components/newpark/newpark.component';
import { ParkInfoComponent } from './components/park-info/park-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    EntryComponent,
    AdminComponent,
    NewuserComponent,
    ClientstatusComponent,
    HomeComponent,
    NewparkComponent,
    ParkInfoComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
