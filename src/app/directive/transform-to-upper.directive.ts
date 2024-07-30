import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTransformToUpper]'
})
export class TransformToUpperDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    const value = target.value;
    const upperCaseValue = value.toUpperCase();
    if (value !== upperCaseValue) {
      this.renderer.setProperty(target, 'value', upperCaseValue);
    }
  }
}
