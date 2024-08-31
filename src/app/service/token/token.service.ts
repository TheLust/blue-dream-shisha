import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly KEY: string = "token";

  constructor(private cookieService: CookieService) {
  }

  public check(): boolean {
    return this.cookieService.check(this.KEY);
  }

  public get(): string {
    return this.cookieService.get(this.KEY);
  }

  public set(token: string): void {
    const date: Date = new Date();
    date.setDate(date.getDate() + 1);

    this.cookieService.set(this.KEY, token, {
      secure: true,
      expires: date
    })
  }

  public delete(): void {
    this.cookieService.delete(this.KEY);
  }
}
