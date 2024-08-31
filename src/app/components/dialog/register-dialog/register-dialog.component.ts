import { Component, OnInit } from '@angular/core';
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
import { AuthService } from "../../../service/api/auth/auth.service";
import { Visibility } from "../../../model/visibility-enum";
import { RegisterRequest } from "../../../model/request/register-request";
import { MatDivider } from "@angular/material/divider";
import { AuthDialogData } from "../../../model/auth-dialog-data";
import { CustomValidators } from "../../form/custom-validators";
import { AuthResponse } from "../../../model/response/auth-response";

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
export class RegisterDialogComponent extends BaseForm implements OnInit {

  public hidePassword: boolean;
  public hideConfirmPassword: boolean;

  constructor(private dialogRef: MatDialogRef<RegisterDialogComponent>,
              private authService: AuthService) {
    super(
      new FormGroup({
        username: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(128)
          ]
        ),
        password: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(256),
            CustomValidators.strongPassword
          ]
        ),
        confirmPassword: new FormControl(
          '',
          [
            Validators.required,
            CustomValidators.match('password'),
          ]
        )
      }));
    this.hidePassword = true;
    this.hideConfirmPassword = true;
  }

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('password')?.updateValueAndValidity({
        emitEvent: false
      });
      this.form.get('confirmPassword')?.updateValueAndValidity({
        emitEvent: false
      });
    });

    this.form.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.form.get('password')?.updateValueAndValidity({
        emitEvent: false
      });
      this.form.get('confirmPassword')?.updateValueAndValidity({
        emitEvent: false
      });
    });
  }

  public login() {
    this.dialogRef.close(<AuthDialogData>{
      redirect: true
    });
  }

  public register() {
    if (!this.form.valid) {
      return;
    }

    this.makeRequest({
      request: () => this.authService.register(<RegisterRequest>this.form.getRawValue()),
      then: (value: AuthResponse) => {
        this.dialogRef.close(<AuthDialogData>{
          token: value.token
        });
      }
    });
  }

  protected readonly Visibility = Visibility;
}
