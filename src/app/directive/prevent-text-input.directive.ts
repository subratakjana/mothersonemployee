import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPreventTextInput]'
})
export class PreventTextInputDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    // Prevent text input by blocking all character keys
    if (/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
    }
  }

}
