import { Component, OnInit } from '@angular/core';
import { UserAccountService } from './user-account.service';
import { UserAccount, Deposit } from './userAccount';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eCommerce-Frontend';
  userAccounts: UserAccount[] = [];
  userAccountsSorted: UserAccount[] = [];
  deposits: Deposit[] = [];
  depositsSorted: Deposit[] = [];


  constructor(private userAccountService: UserAccountService) { }
  ngOnInit() {
    this.getUsers();
    // this.matchDeposit(); unsortiert
    this.getUsersSorted();
    this.matchDepositSorted();
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

  getUsersSorted(): void {
    this.userAccountService.getUsersSorted().subscribe(
      (response: UserAccount[]) => {
        this.userAccountsSorted = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  getDepositsByUser(userId: number): void {
    this.userAccountService.getPaymentsByUser(userId).subscribe(
      (response: Deposit[]) => {
        this.deposits = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }

    )
  }

  getDepositsByUserSorted(userId: number): void {
    this.userAccountService.getPaymentsByUserSorted(userId).subscribe(
      (response: Deposit[]) => {
        this.depositsSorted = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }

    )
  }

  matchDeposit(): void {
    for (let userAccount of this.userAccounts) {
      this.getDepositsByUser(userAccount.id);
      userAccount.deposit = this.deposits;
    }
  }

  matchDepositSorted(): void {
    for (let userAccount of this.userAccounts) {
      this.getDepositsByUserSorted(userAccount.id);
      userAccount.deposit = this.deposits;
    }
  }
}


