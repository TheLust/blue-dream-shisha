import { environment } from "../../../environments/environment";

export class ApiService {

  public readonly API_URL: string;

  constructor() {
    this.API_URL = environment.production
      ? ""
      : environment.apiUrl
  }
}
