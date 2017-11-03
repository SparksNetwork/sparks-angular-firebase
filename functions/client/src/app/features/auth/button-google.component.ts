import { Component } from '@angular/core'

@Component({
  selector: 'auth-button-google',
  styles: [':host { display: block }'],
  template: `
<button class='ui labeled big icon button fluid primary social'>
  <i class='google icon'></i>
  with Google
</button>
`
})

export class ButtonGoogleComponent {}
