import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { UserAccount, Deposit } from '../user/userAccount';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent {

  title = 'eCommerce-Frontend';
  //userAccounts: UserAccount[] = [];
  userAccountsSorted: UserAccount[] = [];
  //deposits: Deposit[] = [];
  depositsSorted: Deposit[] = [];

  depositSum!: number;
  depositSumMissing!: number;

  depositsPeriod: Deposit[] = [];

  tableState!: string;


  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    // this.getUsers();
    // this.matchDeposit(); unsortiert
    this.getUsersSorted();
    this.matchDepositSorted();
    this.getPaymentsPeriod("", "");
    //this.getPaymentsPeriod("2023-02-02", "2023-05-05");
    this.tableState = "all";
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
      case "sum":
        this.tableState = "sum";
        break;
      default:
        this.tableState = "all";
    }
  }


  getData(): void {
    this.getUsersSorted();
    this.matchDepositSorted();
    this.getPaymentsPeriod("", "");
  }


  getPaymentsPeriod(dateBegin: String, dateEnd: String): void {
    if (dateBegin.length != 10 || dateEnd.length != 10) {
      dateBegin = "1000-01-01";
      dateEnd = "3000-01-01";
    }

    this.employeeService.getPaymentsPeriod(dateBegin, dateEnd).subscribe(
      (response: Deposit[]) => {
        this.depositsPeriod = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )

    this.employeeService.getSumPeriod(dateBegin, dateEnd).subscribe(
      (response: number) => {
        this.depositSum = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )

    this.employeeService.getSumMissingPeriod(dateBegin, dateEnd).subscribe(
      (response: number) => {
        this.depositSumMissing = response;
        this.setTableState("period");
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )


  }

  authorizePayment(userId: number, deposit: Deposit): void {
    this.employeeService.resubmitPayment(userId, deposit).subscribe(
      (response: boolean) => {
        console.log("Authorisierung erfolgreich!");
        this.getData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  /*
    getUsers(): void {
      this.employeeService.getUsers().subscribe(
        (response: UserAccount[]) => {
          this.userAccounts = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
      this.getPaymentsPeriod("", "");
      //throw new Error('Method not implemented.');
    }
  */
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

  /*
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
  */

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

  /*
  matchDeposit(): void {
    for (let userAccount of this.userAccounts) {
      this.getDepositsByUser(userAccount.id);
      userAccount.deposit = this.deposits;
    }
  }
  */

  matchDepositSorted(): void {
    for (let userAccount of this.userAccountsSorted) {
      this.getDepositsByUserSorted(userAccount.id);
      userAccount.deposit = this.depositsSorted;
    }
  }


}
