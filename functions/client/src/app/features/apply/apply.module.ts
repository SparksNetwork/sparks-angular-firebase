import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SNUIModule } from "../../shared/snui/snui.module";
import { ApplyRoutingModule } from "./apply-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SNUIModule,
    ApplyRoutingModule,
  ],
  declarations: []
})
export class ApplyModule { }
