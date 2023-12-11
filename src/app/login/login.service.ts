import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserAccount, Deposit } from '../user/userAccount';


@Injectable({
    providedIn: 'root'
})


export class RegService {

    private API_URL = "http://localhost:8080/api/user";

    constructor(private http: HttpClient) { }

    //ngOnInit(): void { }

    public loginUser(userId: number, userPassword: String): Observable<String> {
        return this.http.post<String>(`${this.API_URL}/login/${userId}`, userPassword);
    }

    public getUser(userEmail: String): Observable<UserAccount> {
        return this.http.post<UserAccount>(`${this.API_URL}/get`, userEmail);
    }

    public registerUser(user: UserAccount): Observable<UserAccount> {
        return this.http.post<UserAccount>(`${this.API_URL}/register`, user);
    }





}
