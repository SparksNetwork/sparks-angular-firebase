import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { OrganizeHeaderStateService } from './organize-header.state'

@Component({
  selector: 'organize-header-full',
  template: `
<snui-header-full>
  <h1 class='ui header inverted'>{{state.title$ | async}}</h1>
  <h2 class='ui header inverted'>{{state.subtitle$ | async}}</h2>
</snui-header-full>
`
})
export class OrganizeHeaderFullComponent {
  constructor(
    public state: OrganizeHeaderStateService,
  ) {}
}
