import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

  public static match(compareToControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const compareToControl: AbstractControl | null | undefined = control.parent?.get(compareToControlName);
      if (!compareToControl) {
        return null;
      }

      const controlValue: any = control.value;
      const compareToControlValue: any = compareToControl.value;

      if (!controlValue || !compareToControlValue || controlValue === '' || compareToControlValue === '') {
        return null;
      }

      if (controlValue !== compareToControlValue) {
        return {match: false}
      }

      return null;
    }
  }

  public static strongPassword(control: AbstractControl) {
    const hasNumber = /\d/.test(control.value);
    const hasUppercase = /[A-Z]/.test(control.value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);

    if (!hasNumber || !hasUppercase || !hasSymbol) {
      return {password: true};
    }

    return null;
  }
}
