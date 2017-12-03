import { Component, Input, OnInit } from '@angular/core'
// import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
// import { OrganizeHeaderStateService } from './organize-header.state'
import { OppService } from '../../../core/sndomain/opp'

@Component({
  selector: 'organize-opp-card',
  template: `
<p>{{title$ | async}}</p>
`
})
export class OrganizeOppCardComponent implements OnInit {
  @Input() key: string
  public item$
  public values$
  public title$

  constructor(
    public oppService: OppService,
  ) {}

  ngOnInit() {
    this.item$ = this.oppService.one(this.key)
    this.values$ = this.item$.pluck('values')
    this.title$ = this.values$.pluck('title')
  }

}
