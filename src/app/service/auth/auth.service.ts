import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "../../model/request/login-request";
import { environment } from "../../../environments/environment";
import { RegisterRequest } from "../../model/request/register-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private readonly AUTH_URL = environment.apiUrl + "auth/"

  constructor(private httpClient: HttpClient) {
    super();
  }

  public login(loginRequest: LoginRequest): Promise<string> {
    return lastValueFrom(
      this.httpClient.post<string>(this.AUTH_URL + "login", loginRequest)
    );
  }

  public register(registerRequest: RegisterRequest): Promise<string> {
    return lastValueFrom(
      this.httpClient.post<string>(this.AUTH_URL + "register", registerRequest)
    );
  }
}
