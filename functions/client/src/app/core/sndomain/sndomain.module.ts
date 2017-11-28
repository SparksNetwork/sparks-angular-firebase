import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { ProjectService } from './project/project.service'

import { reducer } from './sndomain.reducer'

@NgModule({
  imports: [
    HttpModule,
    StoreModule.forFeature('sndomain', reducer),
    EffectsModule.forFeature([
      ProjectService,
    ])
  ],
  providers: [
    ProjectService,
  ],
})
export class SnDomainModule { }

