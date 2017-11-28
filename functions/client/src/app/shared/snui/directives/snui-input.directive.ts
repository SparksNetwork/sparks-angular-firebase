import { Directive, ElementRef, HostListener, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Directive({
  selector: '[snuiInput]'
})
export class SnuiInputDirective {
  @Output('value$') public value$ = new BehaviorSubject(null)

  constructor(
    private el: ElementRef
  ) {}

  @HostListener('keyup') onkeyup() {
    this.value$.next(this.el.nativeElement.value)
  }

  @HostListener('change') onchange() {
    console.log(this.el.nativeElement.checked)
    this.value$.next(this.el.nativeElement.value)
  }
}
