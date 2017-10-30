import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'

import { EntState, IdxState } from '../../core/snents/ngrx-ents'

@Component({
  selector: 'explore-routed-home',
  template: `
<h1>Explore/Home</h1>
<div *ngIf='loading$ | async'>
  Loading...
</div>
<div *ngIf='(keys$ | async); let keys'>
  <div *ngFor='let key of keys' >
    <a [routerLink]="['/organize', key]">{{key}}</a>
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
