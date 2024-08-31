import { Injectable } from '@angular/core';
import { LoginRequest } from "../../../model/request/login-request";
import { environment } from "../../../../environments/environment";
import { RegisterRequest } from "../../../model/request/register-request";
import { AuthResponse } from "../../../model/response/auth-response";
import { ApiService } from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_URL = environment.apiUrl + "auth/"

  constructor(private apiService: ApiService) {
  }

  public login(loginRequest: LoginRequest): Promise<AuthResponse> {
    return this.apiService.post(this.AUTH_URL + 'login', loginRequest);
  }

  public register(registerRequest: RegisterRequest): Promise<AuthResponse> {
    return this.apiService.post(this.AUTH_URL + 'register', registerRequest);
  }
}
