import { ProjectsState, projectReducer as projects } from './project'

export const reducer = {
  projects,
}

export interface EntState<T> {
  loaded: boolean,
  loading: boolean,
  values: T,
}

export interface EntsState<T> {
  [key: string]: EntState<T>
}

export interface State {
  projects: ProjectsState
}

