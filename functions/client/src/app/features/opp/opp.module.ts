import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, OppRoutingModule } from "./opp-routing.module";

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    OppRoutingModule
  ],
  providers: []
})
export class OppModule { }
