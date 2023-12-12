import { Component, OnInit } from '@angular/core';
import { UserAccountService } from './user-account.service';
import { UserAccount, Deposit } from './userAccount';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'eCommerce-Frontend';

  // userAccountsSorted: UserAccount[] = [];
  //deposits: Deposit[] = [];


  // zum testen
  userAccounts: UserAccount[] = [];
  depositsSorted: Deposit[] = [];


  depositSortedSingle: Deposit[] = [];
  currentUser!: UserAccount;

  //WICHTIG  tempUserId!: number; wird von Login gesetzt
  tempUserId: number = 1;


  userActive: boolean = false;


  constructor(private userAccountService: UserAccountService) { }
  ngOnInit() {
    //this.getUserState();
    //this.getUsers();
    // this.matchDeposit(); unsortiert
    //this.getUsersSorted();
    //this.matchDepositSorted();
    //this.changeUser(1);
    this.getData();
  }

  getData(): void {

    // für Test mehrere User über Button wechseln
    this.getUsers();
    this.matchDepositSorted();

    this.getUser();
    this.matchDepositSortedSingle();

    //this.getUsersSorted();
    //this.matchDepositSorted();
    //this.changeUser(1);
  }

  formatNumber(resNumber: number): String {
    return (resNumber / 100).toFixed(2); //Nachkomma darstellen
  };


  changeUser(userId: number): void {
    this.tempUserId = userId;
    this.getData();
  }


  //Zum testen, entfällt mit Login
  xchangeUser(userId: number): void {
    for (const user of this.userAccounts) {
      if (user.id == userId) {
        this.userActive = true;
        this.currentUser = user;
      }
    }
  }



  sendPayment(paymentValue: string, description: string, sign: boolean): void {

    if (paymentValue.includes(".") || paymentValue.includes(",")) {
      paymentValue = paymentValue.replace(".", "").replace(",", "");
    } else {
      paymentValue = paymentValue + "00";
    }

    let convNumber: number = Number(paymentValue); // Cast String -> Number

    if (sign) {
      convNumber = convNumber * (-1);
    }

    let nowDate = new Date();
    let deposit: Deposit = {
      id: 0, // Id wird im BE gesetzt
      depositValue: convNumber,
      description: description,
      authorized: false,
      date: nowDate
    }

    this.userAccountService.sendPayment(this.currentUser.id, deposit).subscribe(
      (response: boolean) => {
        console.log("Payment erfolgreich! (" + response + ")");
        console.log("->" + this.currentUser.id + " - " + deposit);
        this.getData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  };



  getUser(): void {
    this.userAccountService.getUser(this.tempUserId).subscribe(
      (response: UserAccount) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  };

  // für Test mehrere User über Button wechseln
  getUsers(): void {
    this.userAccountService.getUsers().subscribe(
      (response: UserAccount[]) => {
        this.userAccounts = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  };

  /*
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
  */

  /*
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
  */

  getDepositsByUserSorted(userId: number): void {
    this.userAccountService.getPaymentsByUserSorted(userId).subscribe(
      (response: Deposit[]) => {
        this.depositsSorted = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }

    )
  };

  /*
  matchDeposit(): void {
    for (let userAccount of this.userAccounts) {
      this.getDepositsByUser(userAccount.id);
      userAccount.deposit = this.deposits;
    }
  }
  */

  matchDepositSortedSingle(): void {
    this.getDepositsByUserSorted(this.currentUser.id);
    this.currentUser.deposit = this.depositSortedSingle;
  };


  // raus, da bei Nutzerwechsel Daten neu geladen werden
  matchDepositSorted(): void {
    for (let userAccount of this.userAccounts) {
      this.getDepositsByUserSorted(userAccount.id);
      userAccount.deposit = this.depositsSorted;
    }
  };
}
