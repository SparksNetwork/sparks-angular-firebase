import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'

import { EntState, IdxState } from '../../core/snents/ngrx-ents'

@Component({
  selector: 'explore-routed-home',
  template: `
<explore-appbar></explore-appbar>
<div class='ui container' style='margin-top:55px;'>
  <explore-header-home></explore-header-home>
  <!-- extract
  <div class='masthead' style='padding-top: 5em; padding-bottom: 5em;'>
    <h1 class='ui header' style='font-size: 3em'>
    make it happen.
    </h1>
    <button class='ui primary button massive'>
      start organizing people
    </button>
  </div>
  -->
</div>

<div class='ui container'>
  <h1 class='ui header' style='padding: 1em 0em;'>
    These projects need your help!
  </h1>
  <div *ngIf='loading$ | async'>
    <div class='ui huge text loader active'>Loading...</div>
  </div>
  <div *ngIf='(keys$ | async); let keys' class='ui three stackable cards'>
    <explore-card-project *ngFor='let key of keys' [key]='key'>
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
