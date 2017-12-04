import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { SnuiModule } from '../../shared/snui/snui.module'

import { ExploreRoutingModule, routedComponents } from './explore.routing'

import { ExploreStateService } from './explore.state'

import { ExploreProjectCardComponent } from './components/explore-project-card.component'

@NgModule({
  declarations: [
    ...routedComponents,
    ExploreProjectCardComponent,
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    SnuiModule,
  ],
  providers: [
    ExploreStateService,
  ]
})
export class ExploreModule { }

