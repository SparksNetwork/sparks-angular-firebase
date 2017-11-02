import { ActionReducer, ActionReducerMap, Action, combineReducers } from '@ngrx/store'
import { ProjectActions } from './project.actions'
import { Project } from './project.model'
import { makeItemReducer, makeIdxReducer } from '../ngrx-ents'

export const entReducer = combineReducers({
  items: makeItemReducer<Project, ProjectActions.All>(ProjectActions),
  idx: makeIdxReducer<ProjectActions.All>(ProjectActions),
})

export function projectReducer(state, action) {
  return entReducer(state, action)
}
