import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizeRoutingModule, routedComponents } from './organize.routing'

// import { AppbarStateService } from './appbar.state'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    OrganizeRoutingModule,
  ],
  providers: [
    // AppbarStateService,
  ],
})
export class OrganizeModule { }

