import { ItemState } from '../base/types'

export interface Project {
  title: string,
  benefit: string,
}

export interface ProjectItem extends ItemState<Project> {}
