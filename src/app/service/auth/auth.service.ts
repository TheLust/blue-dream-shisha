import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthRequest } from "../../model/request/auth-request";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private readonly AUTH_URL = environment.apiUrl + "auth/"

  constructor(private httpClient: HttpClient) {
    super();
  }

  public login(authRequest: AuthRequest): Promise<string> {
    return lastValueFrom(
      this.httpClient.post<string>(this.AUTH_URL + "login", authRequest)
    );
  }
}
