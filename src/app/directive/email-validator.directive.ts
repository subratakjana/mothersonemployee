import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEmailValidator]'
})
export class EmailValidatorDirective {
  private emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    const value = target.value;
    if (!this.emailPattern.test(value)) {
      this.renderer.setProperty(target, 'style.borderColor', 'red');
    } else {
      this.renderer.setProperty(target, 'style.borderColor', 'green');
    }
  }
}
