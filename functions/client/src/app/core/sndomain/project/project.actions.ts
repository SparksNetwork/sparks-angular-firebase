import { Project } from './project.model'

export namespace ProjectActions {
  export const FETCH = '[Project] Fetch'
  export const FETCH_SUCCESS = '[Project] Fetch Success'
  export const FETCH_BY = '[Project] Fetch By'
  export const FETCH_BY_SUCCESS = '[Project] Fetch By Success'
  export const CREATE = '[Project] Create'
  export const CREATE_SUCCESS = '[Project] Create Success'

  export class Fetch {
    readonly type = FETCH
    constructor(public payload: Project) {}
  }

  export class FetchSuccess {
    readonly type = FETCH_SUCCESS
    constructor(public payload: {key: string, values: Project}) {}
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
    constructor(public payload: Project) {}
  }

  export class CreateSuccess {
    readonly type = CREATE_SUCCESS
    constructor(public payload: string) {}
  }

  export type All = Fetch | FetchSuccess | FetchBy | FetchBySuccess | Create | CreateSuccess

}
