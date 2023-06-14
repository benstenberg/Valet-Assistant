import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent {
  @Input() username?: string;
  @Input() password?: string;
  @Input() name?: string;


  constructor(private router: Router, private userAPI: UserService){}

  createUser() {
    if (this.username && this.password && this.name && this.username != "admin") {
      this.userAPI.create({username: this.username, password: this.password, name: this.name, _id: ''})
        .subscribe(user => {
          this.router.navigate(['/admin']);});
    }
  }

}
