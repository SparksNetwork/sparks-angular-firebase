import { combineReducers } from '@ngrx/store'

import { makeEntReducer } from './base/reducer'

import { Project, ProjectActions } from './project'

export const reducer = combineReducers({
  project: makeEntReducer<Project, ProjectActions.All>(ProjectActions),
})
