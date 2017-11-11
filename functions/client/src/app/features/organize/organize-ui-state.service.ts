import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

import { ItemState, IdxState } from '../../core/snents/ngrx-ents'

import { Project, ProjectService } from '../../core/snents/project'
import { Opp, OppService } from '../../core/snents/opp'
import { Team, TeamService } from '../../core/snents/team'

@Injectable()
export class OrganizeUiStateService {
  public currentUrl$: Observable<string>
  public projectSegments$: Observable<string[]>
  public contextSegment$: Observable<string>
  public focusSegments$: Observable<string[]>
  public focus$: Observable<string>
  public focusLabel$: Observable<string>

  public projectKey$: Observable<string>
  public project$: Observable<ItemState<Project>>

  public opps$: Observable<ItemState<Opp>[]>
  public oppKeys$: Observable<string[]>

  public teams$: Observable<ItemState<Team>[]>
  public teamKeys$: Observable<string[]>

  public setupStatus$: Observable<string>

  public contexts = [
    {
      label: 'home',
      routeSegment: 'home',
      iconClasses: 'home icon',
    },
    {
      label: 'recruit',
      routeSegment: 'recruit',
      iconClasses: 'binoculars icon',
    },
    {
      label: 'schedule',
      routeSegment: 'schedule',
      iconClasses: 'calendar icon',
    },
    {
      label: 'roster',
      routeSegment: 'roster',
      iconClasses: 'users icon',
    },
    {
      label: 'onsite',
      routeSegment: 'onsite',
      iconClasses: 'flag icon',
    }
  ]

  constructor(
    public store: Store<any>,
    // public teams: ProjectService,
    public opps: OppService,
    public teams: TeamService,
    public projects: ProjectService,
  ) {
    this.currentUrl$ = this.store.select('routerReducer').select('state')
      .select('url')
      .filter(Boolean)

    const urlSegments$ = this.currentUrl$
      .map(u => u.split('/'))

    this.projectSegments$ = urlSegments$
      .map(s => [`/${s[1]}`, s[2]])

    this.contextSegment$ = urlSegments$
      .map(s => s[3])

    this.focusSegments$ = urlSegments$
      .map(s => s.slice(4))

    this.focus$ = this.focusSegments$
      .switchMap(segs => {
        if ((segs[0] === 'opp') && segs[1]) {
          return this.opps.one(segs[1])
            .do(opp => console.log('opp', opp))
            .pluck('values')
            .filter(Boolean)
            .pluck('title')
        }
        if ((segs[0] === 'team') && segs[1]) {
          return this.teams.one(segs[1])
            .pluck('values')
            .pluck('title')
        }
        return Observable.of('Overview')
      })

    this.focusLabel$ = this.focusSegments$
      .map(segs => {
        if (segs[0] === 'opp') {
          return 'opportunity'
        }
        return 'project'
      })

    this.projectKey$ = this.projectSegments$
      .map(s => s[1])
      .filter(Boolean)

    this.project$ = this.projectKey$
      .switchMap(key => this.projects.one(key))

    const oppsIndex$ = this.projectKey$
      .switchMap(key => this.opps.by('projectKey', key))

    this.oppKeys$ = oppsIndex$
      .pluck('keys')
      .filter(Boolean)

    this.opps$ =  this.oppKeys$
      .switchMap(keys => Observable.combineLatest(
        ...keys.map(key => this.opps.one(key))
      ))

    const teamsIndex$ = this.projectKey$
      .switchMap(key => this.teams.by('projectKey', key))

    this.teamKeys$ = teamsIndex$
      .pluck('keys')
      .filter(Boolean)

    this.teams$ =  this.teamKeys$
      .switchMap(keys => Observable.combineLatest(
        ...keys.map(key => this.teams.one(key))
      ))

    this.setupStatus$ = Observable.combineLatest(
      this.project$,
      this.opps$,
      this.teams$,
      (p, o, t) => {
        if (t.length > 0) { return 'someJobs' }
        if (!t.length) { return 'noJobs' }
        return 'unknown'
      }
    )

    this.setupStatus$.subscribe(s => console.log('setup', s))
  }

  segmentsForContext$(context: string) {
    return Observable.combineLatest(
      this.projectSegments$,
      this.focusSegments$,
      (projectSegments, focusSegments) => ([...projectSegments, context, ...focusSegments])
    )
    // .do(s => console.log('context', s))
  }

  segmentsForFocus$(focus: string[]) {
    return Observable.combineLatest(
      this.projectSegments$,
      this.contextSegment$,
      (projectSegments, contextSegment) => ([...projectSegments, contextSegment, ...focus])
    )
    // .do(s => console.log('focus', s))
  }

  focusLinkActive(focus: string[]) {
    return Observable.combineLatest(
      this.segmentsForFocus$(focus),
      this.currentUrl$,
      (segs, current) => segs.join('/') === current
    )
  }

  contextLinkActive(context: string) {
    return Observable.combineLatest(
      this.segmentsForContext$(context),
      this.currentUrl$,
      (segs, current) => segs.join('/') === current
    )
  }
}
