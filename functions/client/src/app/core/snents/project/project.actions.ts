import { Action, Store } from '@ngrx/store'

export namespace ProjectActions {

  export const FETCH = '[Project] Fetch'
  export const FETCH_SUCCESS = '[Project] Fetch Success'
  export const FETCH_BY = '[Project] Fetch By'
  export const FETCH_BY_SUCCESS = '[Project] Fetch By Success'

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
