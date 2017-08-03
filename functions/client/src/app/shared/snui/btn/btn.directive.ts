import { Directive, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[btn]' })
export class BtnDirective {
  constructor(renderer: Renderer2, el: ElementRef) {
    renderer.addClass(el.nativeElement, 'btn')
    renderer.addClass(el.nativeElement, 'btn-block')
  }
}