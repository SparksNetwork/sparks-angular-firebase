import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ProjectCollectionService } from './project-collection.service';
import { ProjectActionService } from './project-action.service'

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
