import { ActionReducer, Action, combineReducers } from '@ngrx/store'
import * as ProjectActions from './actions'
import { Project } from './project.model'

export interface EntState<T> {
  [key: string]: {
    loaded: boolean,
    loading: boolean,
    values: T,
  }
}
export interface State {
  project: EntState<Project>
}

const entState: EntState<Project> = {}

function addItem(original, key, values) {
  const coll = {}
  coll[key] = values
  return Object.assign(original, coll)
}

export const xprojectReducer: ActionReducer<EntState<Project>> = (state: EntState<Project> = entState, action: ProjectActions.All) => {
  switch (action.type) {
    case ProjectActions.PROJECT_FETCH: {
      return Object.assign({}, state, {
        // loading: true,
        // baz: 'bar'
      })
    }
    // case ProjectActions.PROJECT_FETCH_SUCCESS: {
    //   return {...state, loading: false, loaded: true, items: {}}
    // }
    default: {
      return state
    }
  }
}

export function project(state: EntState<Project> = {}, action: ProjectActions.All) {
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
          ...action.value
        }
      }
    }
    default: {
      return state
    }
  }
}

const projectState = {
  'BABP': {
    $key: 'BABP',
    title: 'Foo',
  }
}
// export const project = (state = projectState, action) => state
// export function reducer(state: State, action: Action): State {
//   return {
//     project: projectReducer(state.project, action)
//   }
// }

// export const reducer = combineReducers<State>({
//   project,
// }, {project: {}})

export const reducer = {
  project,
}

// export const reducer = (state = {}, action) => state

// export function reducer(state = {}, action) { return state }
