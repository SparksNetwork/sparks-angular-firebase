import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

@Injectable()
export class OrganizeUiStateService {
  public currentUrl$: Observable<string>
  public projectSegments$: Observable<string[]>
  public contextSegment$: Observable<string>
  public focusSegments$: Observable<string[]>

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
    public store: Store<any>
  ) {
    this.currentUrl$ = this.store.select('router').select('state')
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
