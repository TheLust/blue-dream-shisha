import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { translate } from "@ngneat/transloco";
import { ErrorCode } from "../../error/error-code";
import { Visibility } from "../../model/visibility-enum";
import { ErrorResponse } from "../../error/error-response";

export class BaseForm {

  public form: FormGroup;
  public spinner: Visibility;

  constructor(form: FormGroup) {
    this.form = form;
    this.spinner = Visibility.HIDDEN;
  }

  public makeRequest<T>(ops: {
    request: () => Promise<T>,
    then: (result: T) => void
  }) {
    console.log('---------- REQUEST STARTED ----------');
    this.spinner = Visibility.VISIBLE;
    ops.request()
      .then(value => {
        console.log('---------- REQUEST SUCCEEDED ----------');
        ops.then(value);
      }).catch(err => {
      console.error('---------- REQUEST FAILED ----------');
      console.error(err);
      const errorResponse: ErrorResponse = this.mapToErrorResponse(err.error);
      if (errorResponse.errorCode === ErrorCode.VALIDATION_ERROR) {
        this.putErrors(errorResponse)
      } else {
        throw err;
      }
    }).finally(() => {
      console.log('---------- REQUEST COMPLETED ----------');
      this.spinner = Visibility.HIDDEN;
    });
  }

  public mapToErrorResponse(err: any): ErrorResponse {
    return <ErrorResponse>{
      message: err.message,
      errorCode: ErrorCode[err.errorCode as keyof typeof ErrorCode],
      errors: err.errors
        ? new Map<string, string>(Object.entries(err.errors))
        : undefined
    };
  }

  public getError(controlName: string): string {
    return translate('field.' + controlName) + ' ' +
      this.getErrorMessage(this.form.controls[controlName].errors)
  }

  private getErrorMessage(errors: ValidationErrors | null) {
    if (!errors) {
      return "";
    }

    const key: string = Object.keys(errors)[0];
    const value: any = errors[key];

    const translatedMessageTemplate: string = translate('violationCode.' + key);
    return this.interpolateErrorMessage(translatedMessageTemplate, value);
  }

  public putErrors(errorResponse: ErrorResponse): void {
    if (!errorResponse.errorCode || (errorResponse.errorCode && errorResponse.errorCode !== ErrorCode.VALIDATION_ERROR)) {
      throw new Error("Cannot put errors because errorCode is not " + ErrorCode.VALIDATION_ERROR);
    }

    if (!errorResponse.errors) {
      throw new Error("Errors map is not valid");
    }
    const errors: Map<string, string> = errorResponse.errors;
    for (const controlName of Object.keys(this.form.controls)) {
      const validationErrorCode: string | undefined = errors.get(controlName);
      const control: AbstractControl | null = this.form.get(controlName);
      if (validationErrorCode && control) {
        let error: ValidationErrors;
        if (validationErrorCode.includes('length')) {
          error = {length: true} as ValidationErrors;
          const lengthError: any = JSON.parse(validationErrorCode);
          const errorData: any = lengthError.length;

          const min: number = errorData.min;
          const max: number = errorData.max;
          const current: number = errorData.actual;

          if (current < min) {
            error = {minlength: {requiredLength: min}} as ValidationErrors;
          }

          if (current > max) {
            error = {maxlength: {requiredLength: max}} as ValidationErrors;
          }
        } else {
          error = {[validationErrorCode]: true} as ValidationErrors;
        }
        control.setErrors(error);
      }
    }
  }

  private interpolateErrorMessage(message: string, error: any): string {
    const placeholderRegex = /\{(.*?)\}/g;
    return message.replace(placeholderRegex, (match, placeholder) => {
      const properties = placeholder.split('.');
      const value = properties.reduce((obj: { [x: string]: any; }, prop: string | number) => obj && obj[prop], error);
      return value !== undefined ? value : match;
    });
  }

  private getCurrentErrors(form: FormGroup): { [key: string]: ValidationErrors | null } {
    const errors: { [key: string]: ValidationErrors | null } = {};
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  private setErrors(form: FormGroup, errors: { [key: string]: ValidationErrors | null }) {
    Object.keys(errors).forEach(key => {
      const control = form.get(key);
      if (control && errors[key]) {
        control.setErrors(errors[key]);
      }
    });
  }
}
