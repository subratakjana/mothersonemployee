import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAllowOnlyText]'
})
export class AllowOnlyTextDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    const text = target.value.replace(/[^a-zA-Z]/g, ''); // Remove non-alphabetic characters
    if (text !== target.value) {
      this.renderer.setProperty(target, 'value', text);
    }

    const value = target.value;
    if (value) {
      const words = value.split(' ');
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
      target.value = words.join(' ');
      this.renderer.setProperty(target, 'value', target.value);
    }
  }
  

}
