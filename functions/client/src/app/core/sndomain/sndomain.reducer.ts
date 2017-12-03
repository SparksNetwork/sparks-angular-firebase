import { combineReducers } from '@ngrx/store'

import { makeEntReducer } from './base/reducer'

import { Project, ProjectActions } from './project'
import { Team, TeamActions } from './team'
import { Opp, OppActions } from './opp'

export const reducer = combineReducers({
  project: makeEntReducer<Project, ProjectActions.All>(ProjectActions),
  team: makeEntReducer<Team, TeamActions.All>(TeamActions),
  opp: makeEntReducer<Opp, OppActions.All>(OppActions),
})
