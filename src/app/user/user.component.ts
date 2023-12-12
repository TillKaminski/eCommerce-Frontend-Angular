import { Component, OnInit } from '@angular/core';
import { UserAccountService } from './user-account.service';
import { UserAccount, Deposit } from './userAccount';
import { HttpErrorResponse } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'eCommerce-Frontend';
  userAccounts: UserAccount[] = [];
  userAccountsSorted: UserAccount[] = [];
  deposits: Deposit[] = [];
  depositsSorted: Deposit[] = [];
  currentUser!: UserAccount;


  constructor(private userAccountService: UserAccountService) { }
  ngOnInit() {
    this.getUsers();
    // this.matchDeposit(); unsortiert
    this.getUsersSorted();
    this.matchDepositSorted();
    //this.changeUser(1);
  }

  formatNumber(resNumber: number): String {
    return (resNumber / 100).toFixed(2); //Nachkomma darstellen
  }

  changeUser(userId: number): void {
    for (const user of this.userAccounts) {
      if (user.id == userId) {
        this.currentUser = user;
      }
    }
  }


  sendPayment(paymentValue: string, description: string, sign: boolean): void {

    if (paymentValue.includes(".") || paymentValue.includes(",")) {
      paymentValue = paymentValue.replace(".", "").replace(",", "");
    } else {
      paymentValue = paymentValue + "00"
    }

    console.log(paymentValue);

    let convNumber: number = Number(paymentValue);

    if (sign) {
      convNumber = convNumber * (-1);
    }

    let nowDate = new Date();
    let deposit: Deposit = {
      id: 0,
      depositValue: convNumber,
      description: description,
      authorized: false,
      date: nowDate
    }

    this.userAccountService.sendPayment(this.currentUser.id, deposit).subscribe(
      (response: boolean) => {
        console.log("Payment erfolgreich!" + response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )

    //this.getUsers();

  }


  getUsers(): void {
    this.userAccountService.getUsers().subscribe(
      (response: UserAccount[]) => {
        this.userAccounts = response;
        this.changeUser(1); // unsauber
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
