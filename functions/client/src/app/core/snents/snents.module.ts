import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { ProjectService, ProjectEffects } from './project'
import { OppService, OppEffects } from './opp'

import { reducer } from './snents.reducer'

@NgModule({
  imports: [
    // StoreModule.forFeature('ents', reducer),
    StoreModule.forFeature('ents', reducer, {initialState: {
      project: {items: {}, idx: {}},
      opp: {items: {}, idx: {}}
    }}),
    EffectsModule.forFeature([
      ProjectEffects,
      OppEffects,
    ])
  ],
  providers: [
    ProjectService,
    OppService,
  ],
})
export class SNEntsModule { }

