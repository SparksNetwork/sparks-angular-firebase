import { NgModule } from '@angular/core';

import { HomeRoutingModule, routedComponents } from './home-routing.module'

@NgModule({
  declarations: routedComponents,
  imports: [HomeRoutingModule],
  providers: [],
})
export class HomeModule { }
