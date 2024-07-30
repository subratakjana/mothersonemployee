import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMinlength]'
})
export class MinlengthDirective {
  @Input('appMinlength') minlength: string | number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    const minLength = typeof this.minlength === 'string' ? parseInt(this.minlength, 10) : this.minlength;

    if (minLength && target.value.length < minLength) {
      this.renderer.setProperty(target, 'value', target.value.padEnd(minLength, ' '));
    }
  }
}
