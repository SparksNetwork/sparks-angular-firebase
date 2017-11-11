import { ActionReducer, ActionReducerMap, Action, combineReducers } from '@ngrx/store'
import { TeamActions } from './team.actions'
import { Team } from './team.model'
import { makeItemReducer, makeIdxReducer } from '../ngrx-ents'

export const entReducer = combineReducers({
  items: makeItemReducer<Team, TeamActions.All>(TeamActions),
  idx: makeIdxReducer<TeamActions.All>(TeamActions),
})

export function teamReducer(state, action) {
  return entReducer(state, action)
}
