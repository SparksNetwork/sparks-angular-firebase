import { Opp } from './opp.model'

export namespace OppActions {
  export const FETCH = '[Opp] Fetch'
  export const FETCH_SUCCESS = '[Opp] Fetch Success'
  export const FETCH_BY = '[Opp] Fetch By'
  export const FETCH_BY_SUCCESS = '[Opp] Fetch By Success'
  export const CREATE = '[Opp] Create'
  export const CREATE_SUCCESS = '[Opp] Create Success'

  export class Fetch {
    readonly type = FETCH
    constructor(public payload: Opp) {}
  }

  export class FetchSuccess {
    readonly type = FETCH_SUCCESS
    constructor(public payload: {key: string, values: Opp}) {}
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
    constructor(public payload: Opp) {}
  }

  export class CreateSuccess {
    readonly type = CREATE_SUCCESS
    constructor(public payload: string) {}
  }

  export type All = Fetch | FetchSuccess | FetchBy | FetchBySuccess | Create | CreateSuccess

}
