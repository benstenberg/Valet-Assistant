import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  @Input() phone?: string;
  error: boolean = false;

  constructor(private router: Router) { }

  submitPhone() {
    if (this.phone) {
      var re = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
      if (!re.test(this.phone)) {
        this.error = true;
        return;
      }
      this.error = false;
      this.router.navigate(['/status'], {queryParams: {phone: this.phone}});
    }
  }

}
