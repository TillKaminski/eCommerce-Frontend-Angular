import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserAccount, Deposit } from '../user/userAccount';
import { DatePeriod } from './employee.date-period';


@Injectable({
    providedIn: 'root'
})


export class EmployeeService {
    private API_URL = "http://localhost:8080/api";

    constructor(private http: HttpClient) { }

    public getUsersSorted(): Observable<UserAccount[]> {
        return this.http.get<UserAccount[]>(`${this.API_URL}/allsorted`);
    };

    public getPaymentsByUserSorted(userId: number): Observable<Deposit[]> {
        return this.http.get<Deposit[]>(`${this.API_URL}/${userId}/paymentssorted/up`)
    };

    public resubmitPayment(userId: number, deposit: Deposit): Observable<boolean> {
        return this.http.put<boolean>(`${this.API_URL}/pay/${userId}/resubpayment`, deposit)
    };

    public getPaymentsPeriod(dateBegin: string, dateEnd: string): Observable<Deposit[]> {
        return this.http.get<Deposit[]>(`${this.API_URL}/payments/${dateBegin}/${dateEnd}`)
    };

    public getSumPeriod(dateBegin: string, dateEnd: string): Observable<number> {
        console.log(dateBegin + " - " + dateEnd);
        return this.http.get<number>(`${this.API_URL}/payments/sum/${dateBegin}/${dateEnd}`)
    };

    public getSumMissingPeriod(dateBegin: string, dateEnd: string): Observable<number> {
        return this.http.get<number>(`${this.API_URL}/payments/summissing/${dateBegin}/${dateEnd}`)
    };
}
