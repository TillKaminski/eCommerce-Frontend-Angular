import { Component, OnInit } from '@angular/core';
import { UserAccountService } from './user-account.service';
import { UserAccount } from './userAccount';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eCommerce-Frontend';
  userAccounts: UserAccount[] = [];


  constructor(private userAccountService: UserAccountService) { }
  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userAccountService.getUsers().subscribe(
      (response: UserAccount[]) => {
        this.userAccounts = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )

    //throw new Error('Method not implemented.');
  }

}


