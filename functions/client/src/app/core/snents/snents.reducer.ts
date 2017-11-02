import { EntState } from './ngrx-ents'
import { Project, projectReducer as project } from './project'
import { Opp, oppReducer as opp } from './opp'

export const reducer = {
  project,
  opp,
}

export interface State {
  project: EntState<Project>
  opp: EntState<Opp>
}

