import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowOnlyNumbers]'
})
export class AllowOnlyNumbersDirective {

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

    // Allow: backspace, delete, tab, escape, enter, arrows
    if (allowedKeys.includes(event.key) ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) ||
        // Allow: Command+A, Command+C, Command+V, Command+X
        (event.metaKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase()))) {
      return;
    }

    // Ensure that it is a number and stop the keypress if not
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

}
