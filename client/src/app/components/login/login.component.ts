import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() username?: string;
  @Input() password?: string;

  error: Boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe((res) => {
        this.username = '';
        this.password = '';
        if (!res.hasOwnProperty("msg")) {
          //console.log(res);
          if (res.name == 'admin' && res.username == 'admin') {
            this.router.navigateByUrl('admin');
            return;
          }
          this.router.navigateByUrl('home');
          this.error = false
        }
        else {
          this.error = true;
        }

      })
    }
  }
}