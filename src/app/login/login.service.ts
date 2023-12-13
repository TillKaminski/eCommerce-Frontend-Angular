import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserAccount, Deposit } from '../user/userAccount';
import { LoginData } from './login-data';


@Injectable({
    providedIn: 'root'
})


export class RegService {

    private API_URL = "http://localhost:8080/api/user";

    constructor(private http: HttpClient) { }

    //ngOnInit(): void { }

    public loginUser(userMail: String, userPassword: String): Observable<number> {
        return this.http.post<number>(`${this.API_URL}/login/${userMail}`, userPassword);
    }

    public getUser(loginDara: LoginData): Observable<UserAccount> {
        return this.http.post<UserAccount>(`${this.API_URL}/get`, loginDara);
    }

    public registerUser(user: UserAccount): Observable<UserAccount> {
        return this.http.post<UserAccount>(`${this.API_URL}/register`, user);
    }





}
