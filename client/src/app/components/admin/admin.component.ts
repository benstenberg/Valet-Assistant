import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users : User[] = [];

  constructor(private userAPI : UserService, private router: Router, private authService : AuthService) {}

  ngOnInit(): void {
    this.populateUsers();
  }

  populateUsers() : void {
    this.userAPI.getAll().subscribe(users => {
      this.users = users;
    })
  }

  info(uid : String) : void {
    this.router.navigate(['/admin/info'], { queryParams: { id: uid } });
  }

  isAdmin(name : String) : boolean {
    return name == 'admin';
  }
  
}
