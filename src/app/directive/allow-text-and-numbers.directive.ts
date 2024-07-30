import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAllowTextAndNumbers]'
})
export class AllowTextAndNumbersDirective {

  private readonly allowedPattern = /^[a-zA-Z0-9]*$/; // Pattern to allow only text and numbers

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    const value = target.value;
    if (!this.allowedPattern.test(value)) {
      // Remove characters that do not match the allowed pattern
      const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
      this.renderer.setProperty(target, 'value', filteredValue);
    }
  }
}
