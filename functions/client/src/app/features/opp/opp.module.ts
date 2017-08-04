import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, OppRoutingModule } from "./opp-routing.module";
import { SNUIModule } from "../../shared/snui/snui.module";

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    OppRoutingModule,
    SNUIModule
  ],
  providers: []
})
export class OppModule { }
