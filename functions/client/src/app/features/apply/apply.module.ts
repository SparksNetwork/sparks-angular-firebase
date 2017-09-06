import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { SNUIModule } from '../../shared/snui/snui.module';
import { ApplyRoutingModule, routedComponents } from './apply-routing.module';
import { ResolveTeamByTeamKey } from './resolve-team-by-team-key/resolve-team-by-team-key.service';
import { FormCompleteProfileComponent } from './form-complete-profile/form-complete-profile.component';
import { ReviewProfileComponent } from './review-profile/review-profile.component';
import { OppTeamsSelectedComponent } from './opp-teams-selected/opp-teams-selected.component';
import { OppTeamsNotSelectedComponent } from './opp-teams-not-selected/opp-teams-not-selected.component';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { ResolveShiftByApplicationTeams } from './resolve-shift-by-application-teams/resolve-shifts-by-application-teams.service';
import { RequireApplicationAcceptedService } from '../../core/sndomain/shift/require-application-accepted.service';
import { ShiftFilterComponent } from './shift-filter/shift-filter.component';

@NgModule({
  declarations: [
    routedComponents,
    OppTeamsSelectedComponent,
    OppTeamsNotSelectedComponent,
    FormCompleteProfileComponent,
    ReviewProfileComponent,
    ShiftListComponent,
    ShiftFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    SNUIModule,
    ApplyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    ResolveTeamByTeamKey,
    ResolveShiftByApplicationTeams,
    RequireApplicationAcceptedService,
  ]
})
export class ApplyModule { }
