import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
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

  constructor(public themeService: ThemeService,
              public languageService: LanguageService,
              public systemService: SystemService) {
  }

  ngOnInit(): void {
    this.themeService.apply();
    this.languageService.apply();
    this.systemService.getVersion()
      .then(value => console.log("Spring is running with backend version " + value.version));
  }

  public shouldShowMenu(expected: number, actual: number | null) {
    return expected === actual;
  }

  protected readonly ThemeEnum = ThemeEnum;
  protected readonly LanguageEnum = LanguageEnum;
}
