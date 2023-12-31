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

    public sendPayment(userId: number, deposit: Deposit): Observable<boolean> {
        return this.http.post<boolean>(`${this.API_URL}/pay/${userId}/addpayment`, deposit);
    };
}
