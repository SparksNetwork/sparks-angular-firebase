import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'auth-centered-container',
  styles: [`
:host {
  padding-top: 150px !important;
  width: 320px !important;
}
`],
  template: `
<ng-content></ng-content>
`
})
export class AuthCenteredContainerComponent {
  @HostBinding('class') klass = 'ui container'

  constructor(
  ) { }
}
