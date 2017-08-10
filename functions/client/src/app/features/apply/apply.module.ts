import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SNUIModule } from "../../shared/snui/snui.module";
import { ApplyRoutingModule, routedComponents } from "./apply-routing.module";

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    SNUIModule,
    ApplyRoutingModule,
  ],
})
export class ApplyModule { }
