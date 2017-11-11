import { EntState } from './ngrx-ents'
import { Project, projectReducer as project } from './project'
import { Opp, oppReducer as opp } from './opp'
import { Team, teamReducer as team } from './team'

export const reducer = {
  project,
  opp,
  team,
}

export interface State {
  project: EntState<Project>
  opp: EntState<Opp>
  team: EntState<Team>
}

