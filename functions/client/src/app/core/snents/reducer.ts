import { ActionReducer, Action, combineReducers } from '@ngrx/store'
import * as ProjectActions from './actions'
import { Project } from './project.model'

export interface EntState<T> {
  loaded: boolean,
  loading: boolean,
  values: T,
}

export interface EntStates<T> {
  [key: string]: EntState<T>
}

export interface State {
  project: EntStates<Project>
}

const entState: EntStates<Project> = {}

function addItem(original, key, values) {
  const coll = {}
  coll[key] = values
  return Object.assign(original, coll)
}

export function project(state: EntStates<Project> = {}, action: ProjectActions.All) {
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

export const reducer = {
  project,
}
