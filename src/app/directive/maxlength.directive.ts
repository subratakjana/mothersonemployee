import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMaxlength]'
})
export class MaxlengthDirective {

  @Input('appMaxlength') maxlength!: string | number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    const maxLength = typeof this.maxlength === 'string' ? parseInt(this.maxlength, 10) : this.maxlength;
    
    if (maxLength && target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength);
      this.renderer.setProperty(target, 'value', target.value);
    }
  }
}
