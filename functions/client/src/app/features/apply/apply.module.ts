import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SNUIModule } from "../../shared/snui/snui.module";
import { ApplyRoutingModule, routedComponents } from "./apply-routing.module";
import { ResolveTeamByTeamKey } from "./resolve-team-by-team-key/resolve-team-by-team-key.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormCompleteProfileComponent } from "./form-complete-profile/form-complete-profile.component";
import { ReviewProfileComponent } from './review-profile/review-profile.component';
import { OppTeamsSelectedComponent } from "./opp-teams-selected/opp-teams-selected.component";
import { OppTeamsNotSelectedComponent } from "./opp-teams-not-selected/opp-teams-not-selected.component";
import { ShiftListComponent } from "./shift-list/shift-list.component";

@NgModule({
  declarations: [
    routedComponents,
    OppTeamsSelectedComponent,
    OppTeamsNotSelectedComponent,
    FormCompleteProfileComponent,
    ReviewProfileComponent,
    ShiftListComponent,
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
    ResolveTeamByTeamKey
  ]
})
export class ApplyModule { }
