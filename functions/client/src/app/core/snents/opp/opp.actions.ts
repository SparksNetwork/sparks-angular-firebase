import { Action, Store } from '@ngrx/store'

export namespace OppActions {

  export const FETCH = '[Opp] Fetch'
  export const FETCH_SUCCESS = '[Opp] Fetch Success'
  export const FETCH_BY = '[Opp] Fetch By Project'
  export const FETCH_BY_SUCCESS = '[Opp] Fetch By Project Success'
  
  export class Fetch implements Action {
    readonly type = FETCH
    constructor(public payload: string) {}
  }

  export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS
    constructor(public payload: {key: string, values: Object}) {}
  }

  export class FetchBy implements Action {
    readonly type = FETCH_BY
    constructor(public payload: {field: string, value: string}) {}
  }

  export class FetchBySuccess implements Action {
    readonly type = FETCH_BY_SUCCESS
    constructor(public payload: {field: string, value: string, keys: string[]}) {}
  }

  export type All = Fetch | FetchSuccess | FetchBy | FetchBySuccess
}
