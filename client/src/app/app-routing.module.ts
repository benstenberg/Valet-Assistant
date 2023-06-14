import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ClientstatusComponent } from './components/clientstatus/clientstatus.component';
import { EntryComponent } from './components/entry/entry.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewparkComponent } from './components/newpark/newpark.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { ParkInfoComponent } from './components/park-info/park-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: EntryComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/new', component: NewuserComponent, canActivate: [AuthGuard] },
  { path: 'status', component: ClientstatusComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home/new', component: NewparkComponent, canActivate: [AuthGuard] },
  { path: 'home/info', component: ParkInfoComponent, canActivate: [AuthGuard] },
  { path: 'admin/info', component: UserInfoComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
