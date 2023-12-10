import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  navToUserPage() {
    this.router.navigate(['/user']);
  }

  navToEmployeePage() {
    this.router.navigate(['/employee']);
  }

  navToLoginPage() {
    this.router.navigate(['/login']);
  }

}
