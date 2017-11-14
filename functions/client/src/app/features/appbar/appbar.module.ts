import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppbarRoutingModule, routedComponents } from './appbar.routing'

import { AppbarStateService } from './appbar.state'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    AppbarRoutingModule,
  ],
  providers: [
    AppbarStateService,
  ],
})
export class AppbarModule { }

