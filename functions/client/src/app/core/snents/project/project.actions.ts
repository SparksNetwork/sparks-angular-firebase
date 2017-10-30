import { Action, Store } from '@ngrx/store'

export namespace ProjectActions {

  export const PROJECT_FETCH = '[Project] Fetch'
  export const PROJECT_FETCH_SUCCESS = '[Project] Fetch Success'
  
  export class Fetch implements Action {
    readonly type = PROJECT_FETCH
    constructor(public payload: string) {}
  }

  export class FetchSuccess implements Action {
    readonly type = PROJECT_FETCH_SUCCESS
    constructor(public key: string, public values: Object) {}
  }

  export type All = Fetch | FetchSuccess
}

// export class ProjectFetch implements Action {
//   readonly type = PROJECT_FETCH
//   constructor(public payload: string) {}
// }

// export class ProjectFetchSuccess implements Action {
//   readonly type = PROJECT_FETCH_SUCCESS
//   constructor(public key: string, public values: Object) {}
// }

// export type All = ProjectFetch | ProjectFetchSuccess
