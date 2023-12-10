import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  navToUserPage() {
    this.router.navigate(['/user']);
  }

  navToEmployeePage() {
    this.router.navigate(['/employee']);
  }

}
