import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { ProjectService, ProjectEffects } from './project'

import { reducer } from './snents.reducer'

@NgModule({
  imports: [
    // StoreModule.forFeature('ents', reducer),
    StoreModule.forFeature('ents', reducer, {initialState: {
      project: {items: {}}
    }}),
    EffectsModule.forFeature([ProjectEffects])
  ],
  providers: [
    ProjectService,
  ],
})
export class SNEntsModule { }

