import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Version } from "../../../model/version";
import { Observable } from "rxjs";
import { ApiService } from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class SystemService extends ApiService {

  private readonly SYSTEM_URL = environment.apiUrl + "system/"

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getVersion(): Observable<Version> {
    return this.httpClient.get<Version>(this.SYSTEM_URL + "version");
  }
}
