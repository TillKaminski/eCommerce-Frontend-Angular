import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { UserAccount, Deposit } from '../user/userAccount';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePeriod } from './employee.date-period';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent {

  title = 'eCommerce-Frontend';
  userAccountsSorted: UserAccount[] = [];
  depositsSorted: Deposit[] = [];

  depositSum!: number;
  depositSumMissing!: number;
  depositsPeriod: Deposit[] = [];

  tableState!: string;

  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.getUsersSorted();
    this.matchDepositSorted();
    this.getPaymentsPeriod("", ""); // zweite Mal Erhalt Zahlungen, aber sortiert
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
    this.getPaymentsPeriod('', '');
  }

  getPaymentsPeriod(dateBegin: string, dateEnd: string): void {
    if (dateBegin.length != 10 || dateEnd.length != 10) {
      dateBegin = '2000-01-01';
      dateEnd = '2050-01-01';
    }

    /*
    const datePeriod: DatePeriod = {
      dateBegin: dateBegin,
      dateEnd: dateEnd
    }
    */

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

  matchDepositSorted(): void {
    for (let userAccount of this.userAccountsSorted) {
      this.getDepositsByUserSorted(userAccount.id);
      userAccount.deposit = this.depositsSorted;
    }
  }
}
