import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon, MatIconRegistry } from "@angular/material/icon";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { NgIf } from "@angular/common";
import { ThemeService } from "./service/theme/theme.service";
import { ThemeEnum } from "./model/theme-enum";
import { MatFormField, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { LanguageService } from "./service/language/language.service";
import { LanguageEnum } from "./model/language-enum";
import { TranslocoPipe } from "@ngneat/transloco";
import { SystemService } from "./service/api/system/system.service";
import { MatDialog } from "@angular/material/dialog";
import { LoginDialogComponent } from "./components/dialog/login-dialog/login-dialog.component";
import { RegisterDialogComponent } from "./components/dialog/register-dialog/register-dialog.component";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthDialogData } from "./model/auth-dialog-data";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatButton,
    MatDivider,
    MatToolbar,
    MatIcon,
    MatTabGroup,
    MatTab,
    MatIconButton,
    NgIf,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatPrefix,
    FormsModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    TranslocoPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(matIconRegistry: MatIconRegistry,
              domSanitizer: DomSanitizer,
              public themeService: ThemeService,
              public languageService: LanguageService,
              private systemService: SystemService,
              private dialog: MatDialog) {
    matIconRegistry.addSvgIcon(
      'google',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon-svg/google.svg')
    )
    matIconRegistry.addSvgIcon(
      'meta',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon-svg/meta.svg')
    )
    matIconRegistry.addSvgIcon(
      'facebook',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon-svg/facebook.svg')
    )
    matIconRegistry.addSvgIcon(
      'facebook-simple',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon-svg/facebook-simple.svg')
    )
  }

  ngOnInit(): void {
    this.themeService.apply();
    this.languageService.apply();
    this.systemService.getVersion().subscribe({
      next: value => console.log("Spring is running with backend version " + value.version)
    });
  }

  public shouldShowMenu(expected: number, actual: number | null) {
    return expected === actual;
  }

  public login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value: AuthDialogData | undefined) => {
          if (value && value.redirect) {
            this.register();
          }
        }
      });
  }

  public register(): void {
    this.dialog.open(RegisterDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value: AuthDialogData | undefined) => {
          if (value && value.redirect) {
            this.login();
          }
        }
      });
  }

  protected readonly ThemeEnum = ThemeEnum;
  protected readonly LanguageEnum = LanguageEnum;
}
