import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SNUIModule } from "../../shared/snui/snui.module";
import { ApplyRoutingModule, routedComponents } from "./apply-routing.module";
import { ResolveTeamByTeamKey } from "./resolve-team-by-team-key/resolve-team-by-team-key.service";
import { FormsModule } from "@angular/forms";
import { OppTeamsSelectService } from "./opp-teams-select/opp-teams-select.service";

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    FormsModule,
    SNUIModule,
    ApplyRoutingModule,
  ],
  providers:[
    ResolveTeamByTeamKey,
    OppTeamsSelectService
  ]
})
export class ApplyModule { }
