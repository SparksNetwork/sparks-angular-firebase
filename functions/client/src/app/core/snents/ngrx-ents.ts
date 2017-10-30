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

interface ItemActions {
  FETCH: string,
  FETCH_SUCCESS: string,
  FETCH_BY: string,
  FETCH_BY_SUCCESS: string,
}

interface BaseActionsAll {
  type: string,
  payload: any
}

export function makeItemReducer<TModel, TActionsAll extends BaseActionsAll>(actions: ItemActions) {
  return function reducer(state: ItemsState<TModel> = {}, action: TActionsAll): ItemsState<TModel> {
    switch (action.type) {
      case actions.FETCH: {
        return {
          ...state,
          [action.payload]: {
            loading: true,
            loaded: false,
          }
        }
      }
      case actions.FETCH_SUCCESS: {
        return {
          ...state,
          [action.payload.key]: {
            loading: false,
            loaded: true,
            values: action.payload.values as TModel,
          }
        }
      }
      default: {
        return state
      }
    }
  }
}

export function makeIdxReducer<TActionsAll extends BaseActionsAll>(actions: ItemActions) {
  return function reducer(state: IdxCacheState = {}, action: TActionsAll): IdxCacheState {
    switch (action.type) {
      case actions.FETCH_BY: {
        return {
          ...state,
          [action.payload.field]: {
            ...state[action.payload.field],
            [action.payload.value]: {
              loading: true
            }
          }
        }
      }
      case actions.FETCH_BY_SUCCESS: {
        return {
          ...state,
          [action.payload.field]: {
            ...state[action.payload.field],
            [action.payload.value]: {
              loading: false,
              loaded: true,
              keys: action.payload.keys,
            }
          }
        }
      }
      default: {
        return state
      }
    }
  }

}
  