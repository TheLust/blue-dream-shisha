import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, Observable } from "rxjs";
import { ApiService } from "../api-service";

@Injectable({
  providedIn: 'root'
})
export class SystemService extends ApiService{

  private readonly SYSTEM_URL = this.API_URL + "system/"

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getVersion(): Promise<{ version: string }> {
    return lastValueFrom(
      this.httpClient.get<{ version: string }>(this.SYSTEM_URL + "version")
    );
  }
}
