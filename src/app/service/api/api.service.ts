import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { TokenService } from "../token/token.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private tokenService: TokenService,
              private httpClient: HttpClient) {
  }

  private getHeaders() {
    return this.tokenService.check() ? new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.get()}`
    }) : undefined;
  }

  public get<T>(url: string): Promise<T> {
    return lastValueFrom(
      this.httpClient.get<T>(url, {headers: this.getHeaders()})
    );
  }

  public post<T>(url: string, body: any): Promise<T> {
    return lastValueFrom(
      this.httpClient.post<T>(url, body, {headers: this.getHeaders()})
    );
  }
}
