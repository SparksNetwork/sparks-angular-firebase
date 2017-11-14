import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ExploreRoutingModule, routedComponents } from './explore.routing'

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
  ],
})
export class ExploreModule { }

