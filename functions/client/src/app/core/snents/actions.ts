import { Action, Store } from '@ngrx/store'

export const PROJECT_FETCH = '[Project] Fetch'
export const PROJECT_FETCH_SUCCESS = '[Project] Fetch Success'

export class ProjectFetch implements Action {
  readonly type = PROJECT_FETCH
  constructor(public payload: string) {}
}

export class ProjectFetchSuccess implements Action {
  readonly type = PROJECT_FETCH_SUCCESS
  constructor(public key: string, public values: Object) {}
}

export type All = ProjectFetch | ProjectFetchSuccess
