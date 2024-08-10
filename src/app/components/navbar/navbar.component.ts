import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSidenav } from "@angular/material/sidenav";
import { NgOptimizedImage } from "@angular/common";
import { MatTabGroup } from "@angular/material/tabs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() menu: MatSidenav | undefined;
  @Input() tabGroup: MatTabGroup | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  public openMenu(tab: 'menu' | 'account'): void {
    if (this.menu) {
      if (this.tabGroup) {
        let index: number;
        switch (tab) {
          case 'menu': {
            index = 0;
            break;
          }
          case 'account': {
            index = 1;
            break;
          }
          default: {
            index = 0;
            break;
          }
        }
        this.tabGroup.selectedIndex = index;
      }

      this.menu.toggle().then();
    }
  }
}
