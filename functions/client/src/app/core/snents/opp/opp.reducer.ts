import { ActionReducer, Action, combineReducers } from '@ngrx/store'
import { OppActions } from './opp.actions'
import { Opp } from './opp.model'
import { EntState, EntsState } from '../snents.reducer'

export type OppState = EntState<Opp>
export type OppsState = EntsState<Opp>

export function projectReducer(state: OppsState = {}, action: OppActions.All) {
  switch (action.type) {
    case OppActions.FETCH: {
      return {
        ...state,
        [action.payload]: {
          loading: true,
        }
      }
    }
    case OppActions.FETCH_SUCCESS: {
      return {
        ...state,
        [action.key]: {
          loading: false,
          loaded: true,
          values: action.values,
        }
      }
    }
    case OppActions.FETCH_BY: {
      return {
        ...state,
        idx: {
          ...state.idx,
          [action.field]: {
            ...state.idx[action.field],
            [action.value]: {
              loading: true
            }
          }
        }
      }
    }
    case OppActions.FETCH_BY_SUCCESS: {
      return {
        ...state,
        idx: {
          ...state.idx,
          
        }
      }
    }
    default: {
      return state
    }
  }
}
