import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/pluck'
import { Action, Store } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'

import { Project, ProjectItem, ProjectService, ProjectActions } from '../../core/sndomain/project'
import { Team, TeamService, TeamActions } from '../../core/sndomain/team'
import { Opp, OppService, OppActions } from '../../core/sndomain/opp'

@Injectable()
export class OrganizeStateService {

  constructor(
    public projectService: ProjectService,
    public teamService: TeamService,
    public oppService: OppService,
    public actions$: Actions,
    public store: Store<any>,
    public router: Router,
  ) {}

  public routeSegments$ = this.store.select('routerReducer').select('state').select('segments')

  public focusSegment$ = this.routeSegments$.map(s => s[2])
  public contextSegment$ = this.routeSegments$.map(s => s[4])
  public actionSegment$ = this.routeSegments$.map(s => s[5])

  public projectKey$ = this.routeSegments$.map(segs => segs[1])
    .filter(Boolean)

  public projectItem$ = this.projectKey$
    .switchMap(key => this.projectService.one(key))

  public projectLoading$ = this.projectItem$
    .map(i => i.loading)

  public project$ = this.projectItem$.pluck('values')

  public projectTitle$ = this.project$.pluck('title')

  public teamIndex$ = this.projectKey$
    .switchMap(key => this.teamService.by('projectKey', key))
  public teamsLoading$ = this.teamIndex$.map(i => i.loading)
  public teamKeys$ = this.teamIndex$.map(i => i.keys || [])
  public teamsLength$ = this.teamKeys$.map(k => k.length)

  public oppIndex$ = this.projectKey$
    .switchMap(key => this.oppService.by('projectKey', key))
  public oppsLoading$ = this.oppIndex$.map(i => i.loading)
  public oppKeys$ = this.oppIndex$.map(i => i.keys || [])
  public oppsLength$ = this.oppKeys$.map(k => k.length)

  public loading$ = Observable.combineLatest(
    this.projectLoading$,
    this.teamsLoading$,
    this.oppsLoading$,
    (p, t, o) => p || t || o
  )

  @Effect({dispatch: false}) onProjectCreateSuccess: Observable<Action> =
    this.actions$.ofType<ProjectActions.CreateSuccess>(ProjectActions.CREATE_SUCCESS)
      .do(a => console.log('Organize/Effect', a))
      .do(a => this.router.navigate(['/organize', a.payload]))

  @Effect({dispatch: false}) onTeamCreateSuccess: Observable<Action> =
    this.actions$.ofType<TeamActions.CreateSuccess>(TeamActions.CREATE_SUCCESS)
      .do(a => console.log('Organize/Effect', a))
      .switchMap(a => this.projectKey$.take(1))
      .do(key => this.router.navigate(['/organize', key]))

  @Effect({dispatch: false}) onOppCreateSuccess: Observable<Action> =
    this.actions$.ofType<OppActions.CreateSuccess>(OppActions.CREATE_SUCCESS)
      .do(a => console.log('Organize/Effect', a))
      .switchMap(a => this.projectKey$.take(1))
      .do(key => this.router.navigate(['/organize', key]))

    public createProject(v: Project) {
    this.projectService.create(v)
  }

  public createTeam(v: Team) {
    this.teamService.create(v)
  }

  public createOpp(v: Opp) {
    this.oppService.create(v)
  }
}
