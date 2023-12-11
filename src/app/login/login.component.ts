import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from '../user/userAccount';
import { RegService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userAccount!: UserAccount;
  userRole!: String;

  constructor(private router: Router, private regService: RegService) { }

  userLogin(userEmail: String, userPassword: String) {

    this.getUser(userEmail);


    this.regService.loginUser(this.userAccount.id, userPassword).subscribe(
      (response: String) => {
        this.userRole = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
    // Switch Case
    if (this.userRole == "USER") {
      this.router.navigate(['/user']);
    }

    if (this.userRole == "EMPLOYEE") {
      this.router.navigate(['/employee']);
    }
  }

  getUser(userEmail: String) {
    this.regService.getUser(userEmail).subscribe(
      (response: UserAccount) => {
        this.userAccount = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  registerUser(user: UserAccount) {
    this.regService.registerUser(user).subscribe(
      (response: UserAccount) => {
        this.userAccount = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }


  navToUserPage() {
    this.router.navigate(['/user']);
  }

  navToEmployeePage() {
    this.router.navigate(['/employee']);
  }

}
