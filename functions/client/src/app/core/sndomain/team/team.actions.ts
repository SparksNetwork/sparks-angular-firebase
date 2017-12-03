import { Team } from './team.model'

export namespace TeamActions {
  export const FETCH = '[Team] Fetch'
  export const FETCH_SUCCESS = '[Team] Fetch Success'
  export const FETCH_BY = '[Team] Fetch By'
  export const FETCH_BY_SUCCESS = '[Team] Fetch By Success'
  export const CREATE = '[Team] Create'
  export const CREATE_SUCCESS = '[Team] Create Success'

  export class Fetch {
    readonly type = FETCH
    constructor(public payload: Team) {}
  }

  export class FetchSuccess {
    readonly type = FETCH_SUCCESS
    constructor(public payload: {key: string, values: Team}) {}
  }

  export class FetchBy {
    readonly type = FETCH_BY
    constructor(public payload: {field: string, value: string}) {}
  }

  export class FetchBySuccess {
    readonly type = FETCH_BY_SUCCESS
    constructor(public payload: {field: string, value: string, keys: string[]}) {}
  }

  export class Create {
    readonly type = CREATE
    constructor(public payload: Team) {}
  }

  export class CreateSuccess {
    readonly type = CREATE_SUCCESS
    constructor(public payload: string) {}
  }

  export type All = Fetch | FetchSuccess | FetchBy | FetchBySuccess | Create | CreateSuccess

}
