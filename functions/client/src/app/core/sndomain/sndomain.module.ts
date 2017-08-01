import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
  ProjectCollectionService,
  ProjectActionService,
} from './project'

@NgModule({
  imports: [
    HttpModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    ProjectCollectionService,
    ProjectActionService,
  ],
})
export class SNDomainModule { }
