import { Component } from '@angular/core'

@Component({
  selector: 'auth-button-facebook',
  styles: [':host { display: block }'],
  template: `
<button class='ui labeled big icon fluid button primary social'>
  <i class='facebook icon'></i>
  with Facebook
</button>
`
})

export class ButtonFacebookComponent {}
