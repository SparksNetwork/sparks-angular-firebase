import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SNUIModule } from '../../shared/snui/snui.module'
import { AppbarRoutingModule, routedComponents } from './appbar-routing.module'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    SNUIModule,
    AppbarRoutingModule,
  ],
  providers: [],
})
export class AppbarModule { }

