import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SNUIModule } from "../../shared/snui/snui.module";
import { ApplyRoutingModule, routedComponents } from "./apply-routing.module";
import { ResolveTeamByTeamKey } from "./resolve-team-by-team-key/resolve-team-by-team-key.service";
import { OppTeamsSelectService } from "./opp-teams-select.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormCompleteProfileComponent } from "./form-complete-profile/form-complete-profile.component";

@NgModule({
  declarations: [
    routedComponents,
    FormCompleteProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SNUIModule,
    ApplyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    ResolveTeamByTeamKey,
    OppTeamsSelectService
  ]
})
export class ApplyModule { }
