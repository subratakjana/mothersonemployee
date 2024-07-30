import { Directive, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumber]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PhoneNumberDirective, multi: true }]
})
export class PhoneNumberDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // don't validate empty value
    }

    const isValid = /^\d{0,10}$/.test(value);
    return isValid ? null : { 'phoneNumberInvalid': true };
  }

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9]/g, ''); // remove all non-numeric characters
    if (value.length > 10) {
      value = value.slice(0, 10); // limit to 10 digits
    }
    input.value = value;
  }
}