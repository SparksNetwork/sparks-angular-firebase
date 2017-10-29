import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { ProjectService } from './project.service'
import { ProjectEffects } from './effects'

import { reducer } from './reducer'
// export function reducer(state = {}, action) { return state }

@NgModule({
  imports: [
    StoreModule.forFeature('ents', reducer),
    EffectsModule.forFeature([ProjectEffects])
  ],
  providers: [
    ProjectService,
  ],
})
export class SNEntsModule { }

