import { Component, Input, OnInit } from '@angular/core'
// import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
// import { OrganizeHeaderStateService } from './organize-header.state'
import { TeamService } from '../../../core/sndomain/team'

@Component({
  selector: 'organize-team-card',
  template: `
<p>{{title$ | async}}</p>
`
})
export class OrganizeTeamCardComponent implements OnInit {
  @Input() key: string
  public item$
  public values$
  public title$

  constructor(
    public teamService: TeamService,
  ) {}

  ngOnInit() {
    this.item$ = this.teamService.one(this.key)
    this.values$ = this.item$.pluck('values')
    this.title$ = this.values$.pluck('title')
  }

}
