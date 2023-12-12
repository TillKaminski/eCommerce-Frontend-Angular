import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserAccount, Deposit } from '../user/userAccount';


@Injectable({
    providedIn: 'root'
})


export class EmployeeService {

    private API_URL = "http://localhost:8080/api";

    constructor(private http: HttpClient) { }

    //ngOnInit(): void { }

    public getUsers(): Observable<UserAccount[]> {
        return this.http.get<UserAccount[]>(`${this.API_URL}/all`);
    }

    public getUsersSorted(): Observable<UserAccount[]> {
        return this.http.get<UserAccount[]>(`${this.API_URL}/allsorted`);
    }

    public getPaymentsByUser(userId: number): Observable<Deposit[]> {
        return this.http.get<Deposit[]>(`${this.API_URL}/${userId}/payments`)
    }

    public getPaymentsByUserSorted(userId: number): Observable<Deposit[]> {
        return this.http.get<Deposit[]>(`${this.API_URL}/${userId}/paymentssorted/true`)
    }

    public resubmitPayment(userId: number, deposit: Deposit): Observable<boolean> {
        return this.http.put<boolean>(`${this.API_URL}/pay/${userId}/resubpayment`, deposit)
    }

    public getPaymentsPeriod(dateBegin: String, dateEnd: String): Observable<Deposit[]> {
        return this.http.get<Deposit[]>(`${this.API_URL}/payments/${dateBegin}/${dateEnd}`)
    }

    public getSumPeriod(dateBegin: String, dateEnd: String): Observable<number> {
        return this.http.get<number>(`${this.API_URL}/payments/sum/${dateBegin}/${dateEnd}`)
    }

    public getSumMissingPeriod(dateBegin: String, dateEnd: String): Observable<number> {
        return this.http.get<number>(`${this.API_URL}/payments/summissing/${dateBegin}/${dateEnd}`)
    }


}
