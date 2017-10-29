import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { ProjectService } from '../../../core/snents/project.service'

// import { Store } from '@ngrx/store'

import { Project } from '../../../core/snents/project.model'
// import { State } from 
// import { IState } from '../../../store/interface'

@Component({
  selector: 'organize-routed-home',
  template: `
<h1>Organize-Home</h1>
<div *ngIf="(project$ | async); let project">
  <h1>{{project.title}}</h1>
  <h2>{{(projectKey$ | async)}}</h2>
  <p>wat</p>
</div>
`
})
export class RoutedHomeComponent {
  public projectKey$: Observable<string>
  public project$: Observable<Project>

  constructor(
    public route: ActivatedRoute,
    public projects: ProjectService,
    // public store: Store<IState>
  ) {
    this.projectKey$ = this.route.params.map(({projectKey}) => projectKey)
      .do(pk => console.log('component/projectKey', pk))
    this.project$ = this.projectKey$
      .switchMap(key => this.projects.one(key))
      .do(p => console.log('component/project', p))
  }
}
