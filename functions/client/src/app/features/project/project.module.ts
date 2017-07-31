import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { ProjectRoutingModule, routedComponents } from './project-routing.module'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    SNUIModule,
    ProjectRoutingModule,
  ],
  providers: [],
})
export class ProjectModule { }

