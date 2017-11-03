import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'

import { EntState, IdxState } from '../../core/snents/ngrx-ents'

// <explore-appbar></explore-appbar>

@Component({
  selector: 'explore-routed-home',
  template: `
<explore-header-home></explore-header-home>
<div class='ui container'>
  <h1 class='ui header' style='padding: 1em 0em;'>
    These projects need your help!
  </h1>
  <div *ngIf='loading$ | async'>
    <div class='ui huge text loader active'>Loading...</div>
  </div>
  <div *ngIf='(keys$ | async); let keys' class='ui three stackable cards'>
    <explore-card-project
      *ngFor='let key of keys'
      [key]='key'
      [routerLink]='["/organize", key]'
      style='cursor: pointer;'
      >
    </explore-card-project>
  </div>
</div>
`
})
export class RoutedHomeComponent {
  public projectsRecruiting$: Observable<IdxState>
  public keys$: Observable<string[]>
  public loading$: Observable<boolean>
  public loaded$: Observable<boolean>

  constructor(
    public route: ActivatedRoute,
    public projects: ProjectService,
  ) {
    this.projectsRecruiting$ = this.projects.by('isRecruiting', 'true')

    this.keys$ = this.projectsRecruiting$.pluck('keys')

    this.loading$ = this.projectsRecruiting$.pluck('loading')
    this.loaded$ = this.projectsRecruiting$.pluck('loaded')
  }
}
