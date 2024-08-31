import { Component } from '@angular/core';
import { SpinnerWrapperComponent } from "../../spinner-wrapper/spinner-wrapper.component";
import { AuthService } from "../../../service/api/auth/auth.service";
import { Visibility } from "../../../model/visibility-enum";
import { TranslocoPipe } from "@ngneat/transloco";
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { BaseForm } from "../../form/base-form";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatButton, MatIconButton } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { LoginRequest } from "../../../model/request/login-request";
import { MatDivider } from "@angular/material/divider";
import { AuthDialogData } from "../../../model/auth-dialog-data";
import { AuthResponse } from "../../../model/response/auth-response";

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    SpinnerWrapperComponent,
    TranslocoPipe,
    MatDialogContent,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatIcon,
    MatInput,
    MatIconButton,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatLabel,
    NgIf,
    MatError,
    MatDivider,
    MatSuffix
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent extends BaseForm {

  public hidePassword: boolean;
  public badCredentials: boolean;

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
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
        )
      })
    );

    this.hidePassword = true;
    this.badCredentials = false;
  }

  register() {
    this.dialogRef.close(<AuthDialogData>{
      redirect: true
    });
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    this.makeRequest({
      request: () => this.authService.login(<LoginRequest>this.form.getRawValue()),
      then: (value: AuthResponse) => {
        this.dialogRef.close(<AuthDialogData>{
          token: value.token
        });
      }
    });
  }

  protected readonly Visibility = Visibility;
}
