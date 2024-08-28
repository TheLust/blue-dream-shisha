import { Component } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SpinnerWrapperComponent } from "../../spinner-wrapper/spinner-wrapper.component";
import { TranslocoPipe } from "@ngneat/transloco";
import { BaseForm } from "../../form/base-form";
import { AuthService } from "../../../service/auth/auth.service";
import { Visibility } from "../../../model/visibility-enum";
import { BlueDreamShishaError } from "../../../error/blue-dream-shisha-error";
import { RegisterRequest } from "../../../model/request/register-request";
import { MatDivider } from "@angular/material/divider";
import { AuthDialogData } from "../../../model/auth-dialog-data";

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    SpinnerWrapperComponent,
    TranslocoPipe,
    MatDivider,
    MatSuffix
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent extends BaseForm {

  public hidePassword: boolean;
  public hideConfirmPassword: boolean;

  constructor(private dialogRef: MatDialogRef<RegisterDialogComponent>,
              private authService: AuthService) {
    super(
      new FormGroup({
        username: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        password: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        confirmPassword: new FormControl(
          '',
          [
            Validators.required
          ]
        )
      })
    );
    this.hidePassword = true;
    this.hideConfirmPassword = true;
  }

  protected readonly Visibility = Visibility;

  public login() {
    this.dialogRef.close(<AuthDialogData>{
      redirect: true
    });
  }

  public register() {
    if (!this.form.valid) {
      return;
    }

    this.makeRequest(
      () => this.authService.register(<RegisterRequest>this.form.getRawValue())
    ).then(token => console.log(token))
      .catch((err: BlueDreamShishaError) => {
        this.putErrors(err.errorResponse);
      });
  }
}
