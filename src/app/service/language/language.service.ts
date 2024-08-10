import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { LanguageEnum } from "../../model/language-enum";
import { TranslocoService } from "@ngneat/transloco";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly KEY: string = "language";

  constructor(private cookieService: CookieService,
              private transloco: TranslocoService) {
  }

  private _language: LanguageEnum = this.get();

  public get language(): LanguageEnum {
    return this._language;
  }

  public set language(language: LanguageEnum) {
    this._language = language;
    this.setAndApply(language);
  }

  public get(): LanguageEnum {
    const languageFromCookies: string = this.cookieService.get(this.KEY);
    if (languageFromCookies === '') {
      this.set(LanguageEnum.ROMANIAN)
      return LanguageEnum.ROMANIAN;
    } else {
      const type = languageFromCookies as keyof typeof LanguageEnum
      return type as LanguageEnum;
    }
  }

  public set(language: LanguageEnum): void {
    this.cookieService.set(this.KEY, language);
  }

  public apply(): void {
    const language: LanguageEnum = this.get();
    if (this.transloco.getActiveLang() !== language) {
      lastValueFrom(this.transloco.load(language)).then(() => {
        this.transloco.setActiveLang(language)
      });
    }
  }

  public setAndApply(language: LanguageEnum): void {
    this.cookieService.set(this.KEY, language);
    if (this.transloco.getActiveLang() !== language) {
      lastValueFrom(this.transloco.load(language)).then(() => {
        this.transloco.setActiveLang(language)
      });
    }
  }
}
