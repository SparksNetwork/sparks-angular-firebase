import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'auth-action-buttons',
  styles: [':host { display: block; }'],
  template: `
  <button *ngIf='!cancelRouterLink' (click)='cancelClick$.next()' class='cancel ui left floated big button inverted minor'>
    cancel
  </button>
  <button *ngIf='cancelRouterLink' [routerLink]='cancelRouterLink' class='cancel ui left floated big button inverted minor'>
    cancel
  </button>
  <button class='ok ui right floated big button primary minor' [disabled]='okDisabled' (click)='okClick$.next()'>
    <ng-content></ng-content>
  </button>
`
})
export class AuthActionButtonsComponent {
  @Input('cancelRouterLink') cancelRouterLink: string[]
  @Input('okDisabled') okDisabled: boolean
  @Output('cancelClick$') cancelClick$ = new EventEmitter<boolean>()
  @Output('okClick$') okClick$ = new EventEmitter<boolean>()

  constructor(
  ) { }

}
