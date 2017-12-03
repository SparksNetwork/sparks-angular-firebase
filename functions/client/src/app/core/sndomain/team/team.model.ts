import { ItemState } from '../base/types'

export interface Team {
  title: string,
  membership: string,
  projectKey: string,
}

export interface TeamItem extends ItemState<Team> {}
