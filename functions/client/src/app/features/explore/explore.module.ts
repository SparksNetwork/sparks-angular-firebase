import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { SnuiModule } from '../../shared/snui/snui.module'

import { ExploreRoutingModule, routedComponents } from './explore.routing'

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    SnuiModule,
  ],
})
export class ExploreModule { }

