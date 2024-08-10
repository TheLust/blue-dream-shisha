import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { ThemeEnum } from "../../model/theme-enum";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly KEY: string = "theme";

  constructor(private cookieService: CookieService) { }

  private _theme: ThemeEnum = this.get();

  public get theme(): ThemeEnum {
    return this._theme;
  }

  public set theme(theme: ThemeEnum) {
    this._theme = theme;
    this.setAndApply(theme);
  }

  public get(): ThemeEnum {
    const themeFromCookies: string = this.cookieService.get(this.KEY);
    if (themeFromCookies === '') {
      this.set(ThemeEnum.LIGHT)
      return ThemeEnum.LIGHT;
    } else {
      const type = themeFromCookies as keyof typeof ThemeEnum
      return type as ThemeEnum;
    }
  }

  public set(theme: ThemeEnum): void {
    this.cookieService.set(this.KEY, theme);
  }

  public apply(): void {
    const theme: ThemeEnum = this.get();
    if (theme === ThemeEnum.LIGHT) {
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
      }
    }

    if (theme === ThemeEnum.DARK) {
      if (!document.body.classList.contains('dark')) {
        document.body.classList.add('dark');
      }
    }
  }

  public setAndApply(theme: ThemeEnum): void {
    this.cookieService.set(this.KEY, theme);
    if (theme === ThemeEnum.LIGHT) {
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
      }
    }

    if (theme === ThemeEnum.DARK) {
      if (!document.body.classList.contains('dark')) {
        document.body.classList.add('dark');
      }
    }
  }
}
