import { Component, Input } from '@angular/core';
import { NgIf } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Visibility } from "../../model/visibility-enum";

@Component({
  selector: 'app-spinner-wrapper',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './spinner-wrapper.component.html',
  styleUrl: './spinner-wrapper.component.scss'
})
export class SpinnerWrapperComponent {
  @Input()
  public spinner: Visibility = Visibility.HIDDEN;

  public get booleanSpinner(): boolean {
    return this.spinner === Visibility.VISIBLE;
  }
}
