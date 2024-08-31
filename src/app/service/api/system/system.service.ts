import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Version } from "../../../model/version";
import { ApiService } from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private readonly SYSTEM_URL = environment.apiUrl + "system/"

  constructor(private apiService: ApiService) {
  }

  public getVersion(): Promise<Version> {
    return this.apiService.get<Version>(this.SYSTEM_URL + "version");
  }
}
