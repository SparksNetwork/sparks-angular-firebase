import { Component } from '@angular/core'
@Component({
  selector: 'explore-home-page',
  template: `
<h1>Make it Happen.</h1>
<button [routerLink]='["/organize", "start"]'>start organizing people</button>
`
})
export class ExploreHomePageComponent {

  constructor(
  ) {}
}
