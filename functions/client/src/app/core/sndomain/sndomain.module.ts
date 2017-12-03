import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { ProjectService } from './project'
import { TeamService } from './team'
import { OppService } from './opp'

import { reducer } from './sndomain.reducer'

@NgModule({
  imports: [
    HttpModule,
    StoreModule.forFeature('sndomain', reducer),
    EffectsModule.forFeature([
      ProjectService,
      TeamService,
      OppService,
    ])
  ],
  providers: [
    ProjectService,
    TeamService,
    OppService,
  ],
})
export class SnDomainModule { }

