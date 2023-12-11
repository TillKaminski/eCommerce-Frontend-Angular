import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { UserAccount, Deposit } from '../user/userAccount';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  title = 'eCommerce-Frontend';
  userAccounts: UserAccount[] = [];
  userAccountsSorted: UserAccount[] = [];
  deposits: Deposit[] = [];
  depositsSorted: Deposit[] = [];

  tableState!: String;


  constructor(private employeeService: EmployeeService, private changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit() {
    this.getUsers();
    // this.matchDeposit(); unsortiert
    this.getUsersSorted();
    this.matchDepositSorted();
    this.tableState = "all"
  }

  formatNumber(resNumber: number): String {
    return (resNumber / 100).toFixed(2); //Nachkomma darstellen
  }


  setTableState(tableState: String): void {
    switch (tableState) {
      case "all":
        this.tableState = "all";
        break;
      case "done":
        this.tableState = "done";
        break;
      case "auth":
        this.tableState = "auth";
        break;
      case "period":
        this.tableState = "period";
        break;
      default:
        this.tableState = "all";
    }


  }


  authorizePayment(userId: number, deposit: Deposit): void {
    this.employeeService.resubmitPayment(userId, deposit).subscribe(
      (response: boolean) => {
        console.log("Authorisierung erfolgreich!");
        this.changeDetectorRef.detectChanges();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }


  getUsers(): void {
    this.employeeService.getUsers().subscribe(
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
    this.employeeService.getUsersSorted().subscribe(
      (response: UserAccount[]) => {
        this.userAccountsSorted = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  getDepositsByUser(userId: number): void {
    this.employeeService.getPaymentsByUser(userId).subscribe(
      (response: Deposit[]) => {
        this.deposits = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }

    )
  }

  getDepositsByUserSorted(userId: number): void {
    this.employeeService.getPaymentsByUserSorted(userId).subscribe(
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
