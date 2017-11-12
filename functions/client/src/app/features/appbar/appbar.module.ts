import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppbarRoutingModule, routedComponents } from './appbar.routing'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    AppbarRoutingModule,
  ],
  providers: [],
})
export class AppbarModule { }

