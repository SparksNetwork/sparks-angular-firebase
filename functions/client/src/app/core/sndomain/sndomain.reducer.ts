import { combineReducers } from '@ngrx/store'

import { makeEntReducer } from './base/reducer'

import { Project, ProjectActions } from './project'
import { Team, TeamActions } from './team'

export const reducer = combineReducers({
  project: makeEntReducer<Project, ProjectActions.All>(ProjectActions),
  team: makeEntReducer<Team, TeamActions.All>(TeamActions),
})
