import { Component } from '@angular/core'
// import { ActivatedRoute } from '@angular/router'
// import { Observable } from 'rxjs/Observable'
// import { Project, ProjectService } from '../../core/snents/project'

// import { EntState, IdxState } from '../../core/snents/ngrx-ents'

@Component({
  selector: 'explore-home-page',
  template: `
<h1>Make it Happen.</h1>
<button [routerLink]='["/organize", "start"]'>start organizing people</button>
`
})
export class ExploreHomePageComponent {
  // public projectsRecruiting$: Observable<IdxState>
  // public keys$: Observable<string[]>
  // public loading$: Observable<boolean>
  // public loaded$: Observable<boolean>

  constructor(
    // public route: ActivatedRoute,
    // public projects: ProjectService,
  ) {
    // this.projectsRecruiting$ = this.projects.by('isRecruiting', 'true')

    // this.keys$ = this.projectsRecruiting$.pluck('keys')

    // this.loading$ = this.projectsRecruiting$.pluck('loading')
    // this.loaded$ = this.projectsRecruiting$.pluck('loaded')
  }
}
