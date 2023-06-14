import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user : User = {
    _id: '',
    username: '',
    name: '',
    password: ''
  }

  constructor(private route : ActivatedRoute, private router: Router, private userAPI : UserService) { }

  ngOnInit(): void {
    // pull id from query param
    this.route.queryParams
      .subscribe(params => {
        this.user._id = params['id'];
        this.loadUser(this.user._id);
      });
  }

  loadUser(uid : String) : void {
    this.userAPI.getById(uid).subscribe( data => {
      this.user = data;
      this.user.password = '';
    })
  }

  updateUser(): void {
    if(this.user.password && this.user.name) {
      this.userAPI.update(this.user).subscribe( () => {
        this.router.navigate(['/admin']);
      });
    }
  }

  deleteUser(): void {
    this.userAPI.delete(this.user._id).subscribe( () => {
      this.router.navigate(['/admin']);
    })
  }

}
