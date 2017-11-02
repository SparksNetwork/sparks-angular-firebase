import { ActionReducer, ActionReducerMap, Action, combineReducers } from '@ngrx/store'
import { OppActions } from './opp.actions'
import { Opp } from './opp.model'
import { makeItemReducer, makeIdxReducer } from '../ngrx-ents'

export const entReducer = combineReducers({
  items: makeItemReducer<Opp, OppActions.All>(OppActions),
  idx: makeIdxReducer<OppActions.All>(OppActions),
})

export function oppReducer(state, action) {
  return entReducer(state, action)
}
