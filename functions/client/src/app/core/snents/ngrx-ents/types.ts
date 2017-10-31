export interface IdxState {
  loaded: boolean,
  loading: boolean,
  keys: string[]
}

export const DEFAULT_IDX: IdxState = {
  loading: false,
  loaded: false,
  keys: []
}

export interface IdxCacheState {
  [field: string]: {
    [value: string]: IdxState,
  }
}

export interface ItemState<T> {
  loaded: boolean,
  loading: boolean,
  values?: T,
}

export interface ItemsState<T> {
  [key: string]: ItemState<T>
}

export interface EntState<T> {
  items: ItemsState<T>
  // idx: IdxCacheState
}

export interface ItemActions {
  FETCH: string,
  FETCH_SUCCESS: string,
  FETCH_BY: string,
  FETCH_BY_SUCCESS: string,
}

export interface BaseActionsAll {
  type: string,
  payload: any
}

