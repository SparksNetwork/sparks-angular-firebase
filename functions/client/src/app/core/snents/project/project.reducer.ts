import { ActionReducer, Action, combineReducers } from '@ngrx/store'
import { ProjectActions } from './project.actions'
import { Project } from './project.model'
import { EntState, EntsState } from '../snents.reducer'

export type ProjectState = EntState<Project>
export type ProjectsState = EntsState<Project>

export function projectReducer(state: ProjectsState = {}, action: ProjectActions.All) {
  switch (action.type) {
    case ProjectActions.PROJECT_FETCH: {
      return {
        ...state,
        [action.payload]: {
          loading: true,
        }
      }
    }
    case ProjectActions.PROJECT_FETCH_SUCCESS: {
      return {
        ...state,
        [action.key]: {
          loading: false,
          loaded: true,
          values: action.values,
        }
      }
    }
    default: {
      return state
    }
  }
}
