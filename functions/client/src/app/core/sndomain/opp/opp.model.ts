import { ItemState } from '../base/types'

export interface Opp {
  title: string,
}

export interface OppItem extends ItemState<Opp> {}
