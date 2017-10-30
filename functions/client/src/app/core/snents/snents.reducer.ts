import { EntState } from './ngrx-ents'
import { Project, projectReducer as project } from './project'

export const reducer = {
  project,
}

export interface State {
  project: EntState<Project>
}

