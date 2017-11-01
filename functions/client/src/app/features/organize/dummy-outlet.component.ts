import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'snui-dummy-outlet',
  template: `
<h1>{{title$ | async}}</h1>
<router-outlet></router-outlet>
`
})
export class DummyOutletComponent {
  public title$: Observable<string>

  constructor(
    public route: ActivatedRoute
  ) {
    this.title$ = this.route.data.map(d => d['title'] || 'Not Set')
  }
}
