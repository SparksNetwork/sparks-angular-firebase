import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {
  ProjectQueryService,
  ProjectActionService,
  ProjectPathsService,
} from './project'

import {
  OppQueryService,
  OppActionService,
  OppPathsService,
} from './opp'

@NgModule({
  imports: [
    HttpModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    ProjectPathsService,
    ProjectQueryService,
    ProjectActionService,

    OppQueryService,
    OppActionService,
    OppPathsService,
  ],
})
export class SNDomainModule { }
