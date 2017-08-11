import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SNUIModule } from "../../shared/snui/snui.module";
import { ApplyRoutingModule, routedComponents } from "./apply-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormCompleteProfileComponent } from "./form-complete-profile/form-complete-profile.component";

@NgModule({
  declarations: [
    routedComponents,
    FormCompleteProfileComponent
  ],
  imports: [
    CommonModule,
    SNUIModule,
    ApplyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ApplyModule { }
