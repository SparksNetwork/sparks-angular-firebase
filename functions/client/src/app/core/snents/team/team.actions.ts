import { Action, Store } from '@ngrx/store'

export namespace TeamActions {

  export const FETCH = '[Team] Fetch'
  export const FETCH_SUCCESS = '[Team] Fetch Success'
  export const FETCH_BY = '[Team] Fetch By'
  export const FETCH_BY_SUCCESS = '[Team] Fetch By Success'
  export const CREATE = '[Team] Create'
  export const CREATE_SUCCESS = '[Team] Create Success'

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

  export class Create implements Action {
    readonly type = CREATE
    constructor(public payload: {[prop: string]: string}) {}
  }

  export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS
    constructor(public payload: string) {}
  }

  export type All = Fetch | FetchSuccess | FetchBy | FetchBySuccess
}
