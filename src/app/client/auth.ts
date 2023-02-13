import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { SignInResponse, SignInRequest, GreetingResponse, SocketMessage } from "./dto";

import { InjectionToken } from "@angular/core";

export const BASE_URL = new InjectionToken<string>('baseUrl');

@Injectable()
export class AuthClient {
    constructor(
        @Inject(BASE_URL) baseUrl: string,
        private http: HttpClient,
    ) {
        this.baseUrl = baseUrl;
    }
    private baseUrl: string

    public signIn(email: string, password: string): Observable<SignInResponse> {
        const url = 'http://' + this.baseUrl + '/Authorize';
        const body: SignInRequest = {
            email,
            password
        };
        return this.http.post<SignInResponse>(url, body);
    }

    public getGreeting(token: string): Observable<GreetingResponse> {
        const url = 'http://' + this.baseUrl + '/GetGreeting';
        return this.http.get<GreetingResponse>(url, {
            headers: {
                "x-user-token": token
            }
        });
    }

    public startLoginStream(token: string): Observable<SocketMessage> {
        const url = 'ws://' + this.baseUrl + `/?${token}`;
        const subject = webSocket<SocketMessage>(url);
        return subject.asObservable();
    }
}