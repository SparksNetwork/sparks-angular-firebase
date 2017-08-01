import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
  ProjectQueryService,
  ProjectActionService,
  ProjectPathsService,
} from './project'

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
  ],
})
export class SNDomainModule { }
