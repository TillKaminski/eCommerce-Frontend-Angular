import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserAccount, Deposit } from './userAccount';


@Injectable({
    providedIn: 'root'
})

export class UserAccountService {

    private API_URL = "http://localhost:8080/api";

    constructor(private http: HttpClient) { }

    public getUsers(): Observable<UserAccount[]> {
        return this.http.get<UserAccount[]>(`${this.API_URL}/all`);
    };

    public getUser(userId: number): Observable<UserAccount> {
        return this.http.get<UserAccount>((`${this.API_URL}/${userId}`));
    };

    public getPaymentsByUser(userId: number): Observable<Deposit[]> {
        return this.http.get<Deposit[]>(`${this.API_URL}/${userId}/payments`);
    };

    public getPaymentsByUserSorted(userId: number): Observable<Deposit[]> {
        return this.http.get<Deposit[]>(`${this.API_URL}/${userId}/paymentssorted/up`);
    };

    public sendPayment(userId: number, deposit: Deposit): Observable<Deposit> {
        return this.http.post<Deposit>(`${this.API_URL}/pay/${userId}/addpayment`, deposit);
    };

    public cancelPayment(userId: number, depositId: number, token: number): Observable<number> {
        // let getToken : Observable<number> =  this.http.post<number>(`${this.API_URL}/payments/${deposit.id}/cancel/${token}`, deposit);
        return this.http.post<number>(`${this.API_URL}/payments/${depositId}/cancel/${token}`, depositId);
        // if (token > 0) {
        //    return true;
        // }
        // return false;
    };
}
