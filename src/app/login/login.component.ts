import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from '../user/userAccount';
import { RegService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoginData } from './login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userAccount!: UserAccount;
  userId!: number;

  constructor(private router: Router, private regService: RegService) { }

  onLogin(loginForm: NgForm): void {

    let userMail: String = loginForm.value.userMail;
    let userPassword: String = loginForm.value.userPassword;

    console.log(userMail);
    console.log(userPassword);


    /*
    const loginData: LoginData = {
      email: userMail,
      password: userPassword
    };
*/

    console.log("Login");
    /*
        this.regService.loginUser(userMail, userPassword).subscribe(
          (response: number) => {
            this.userId = response;
            console.log(1);
            if (this.userId == undefined) {
              this.userId = 1;
            }
            this.router.navigate(['/user', { tempUserId: this.userId }]);
          },
          (error: HttpErrorResponse) => {
            console.log(2);
            console.log(error.message);
          }
        )
    */

    this.userId = 1;
    this.router.navigate(['/user', { tempUserId: this.userId }]);
    // Switch Case
    //if (this.userRole == "USER") {
    //this.router.navigate(['/user', { tempUserId: this.userId }]);
    // }

    // if (this.userRole == "EMPLOYEE") {
    //  this.router.navigate(['/employee']);
    // }
  }

  onRegister(regForm: NgForm): void {

    console.log("onRegister");
    document.getElementById('register-form"')?.click;
    console.log(regForm.value);
    this.regService.registerUser(regForm.value).subscribe(
      (response: UserAccount) => {
        console.log(response);
        //this.getEmployees();

        regForm.reset();

        //if (this.userRole == "USER") {
        this.router.navigate(['/user', { data: response.id }]);
        // }
        /*
        if (this.userRole == "EMPLOYEE") {
          this.router.navigate(['/employee']);
        }
        */
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        regForm.reset();
      }
    );
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


  public onRegModal(user: UserAccount | null): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';

    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#regModal');

    container?.appendChild(button);
    button.click();
  }

}
