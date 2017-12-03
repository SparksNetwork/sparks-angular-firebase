import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/observable/combineLatest'

import { Action, Store } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'

import { OrganizeStateService } from '../organize.state'

@Injectable()
export class OrganizeHeaderStateService {

  constructor(
    public organizeState: OrganizeStateService,
  ) {}

  public title$ = this.organizeState.projectTitle$

  public subtitle$ = Observable.combineLatest(
    this.organizeState.focusSegment$,
    this.organizeState.contextSegment$,
    this.organizeState.actionSegment$,
    (focus, context, action) => {
      console.log('navstate', focus, context, action)
      if (action === 'create-team') { return 'Create Team' }
      if (focus === 'project') { return 'Project Overview' }
    }
  )
}
