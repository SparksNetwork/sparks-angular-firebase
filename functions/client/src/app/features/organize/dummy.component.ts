import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'snui-dummy',
  template: `
<h1 class='ui header'>{{title$ | async}}</h1>
`
})
export class DummyComponent {
  public title$: Observable<string>

  constructor(
    public store: Store<any>
  ) {
    this.title$ = this.store.select('routerReducer').select('state').select('url')
  }
}
