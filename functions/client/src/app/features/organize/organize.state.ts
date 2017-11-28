import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/pluck'
import { Action, Store } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'

import { Project, ProjectItem, ProjectService, ProjectActions } from '../../core/sndomain/project'

@Injectable()
export class OrganizeStateService {
  // public project$: Observable<ProjectItem>

  constructor(
    public projectService: ProjectService,
    public actions$: Actions,
    public store: Store<any>,
    public router: Router,
  ) {
    // this.projectKey$.subscribe(segs => console.log('segments', segs))
    // console.log('projectKey$', this.projectKey$)
  }

  public routeSegments$ = this.store.select('routerReducer').select('state').select('segments')
  public projectKey$ = this.routeSegments$.map(segs => segs[1])
  public projectItem$ = this.projectKey$
    .switchMap(key => this.projectService.one(key))
  public project$ = this.projectItem$.pluck('values')
  public projectTitle$ = this.project$.pluck('title')
    // .map(segments => )
  // public project$: Observable<ProjectItem> =
  //   this.projectService.one()
  @Effect({dispatch: false}) onProjectCreateSuccess: Observable<Action> =
    this.actions$.ofType<ProjectActions.CreateSuccess>(ProjectActions.CREATE_SUCCESS)
      .do(a => console.log('Organize/Effect', a))
      .do(a => this.router.navigate(['/organize', a.payload]))

  public createProject(v: Project) {
    this.projectService.create(v)
  }
}
