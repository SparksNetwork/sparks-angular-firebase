import { BaseActionsAll, ItemActions, ItemsState, IdxCacheState } from './types'

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
