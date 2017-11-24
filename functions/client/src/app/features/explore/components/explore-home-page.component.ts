import { Component } from '@angular/core'
@Component({
  selector: 'explore-home-page',
  template: `
<snui-header-full>
  <h1 class='ui header inverted'>Make it Happen.</h1>
  <button class='ui primary button large' [routerLink]='["/organize", "start"]'>
    start organizing people
  </button>
</snui-header-full>
`
})
export class ExploreHomePageComponent {

  constructor(
  ) {}
}
