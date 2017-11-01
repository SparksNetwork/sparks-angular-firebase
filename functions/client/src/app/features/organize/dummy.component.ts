import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'snui-dummy',
  template: `
<h1>{{title$ | async}}</h1>
`
})
export class DummyComponent {
  public title$: Observable<string>

  constructor(
    public route: ActivatedRoute
  ) {
    this.title$ = this.route.data.map(d => d['title'] || 'Not Set')
  }
}
