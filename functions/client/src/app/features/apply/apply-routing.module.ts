import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ResolveOppByOppKey,
} from '../../core/sndomain/opp'

import { RequireAuth } from '../../core/snauth/require-auth/require-auth.service'
import { RequireEmailVerification } from "../../core/snauth/require-email-verification/require-email-verification.service";
import { PageCompleteProfileComponent } from "./page-complete-profile/page-complete-profile.component";
import { ResolveTeamByOppKey } from "../../core/sndomain/team/resolve-team-by-opp-key.service";
import { PageOppTeamsComponent } from "./page-opp-teams/page-opp-teams.component";
import { PageOppTeamComponent } from "./page-opp-team/page-opp-team.component";
import { PageOppHomeTeamsComponent } from "./page-opp-home-teams/page-opp-home-teams.component";
import { PageAnswerQuestionComponent } from './page-answer-question/page-answer-question.component'
import { ResolveTeamByTeamKey } from "./resolve-team-by-team-key/resolve-team-by-team-key.service";
import { OppTeamsSelectedComponent } from "./opp-teams-selected/opp-teams-selected.component";
import { OppTeamsNotSelectedComponent } from "./opp-teams-not-selected/opp-teams-not-selected.component";
import { RequireProfileCompleteService } from '../../core/sndomain/profile'
import { ResolveApplicationTeamByAppKey } from "../../core/sndomain/applicationTeam/resolve-application-team-by-app-key.service";

const routes: Routes = [
    {
        path: ':oppKey',
        canActivate: [
           RequireAuth,
           RequireEmailVerification,
        ],
        resolve: {
            opp: ResolveOppByOppKey
        },
        children: [
            {
                path: 'complete-profile',
                component: PageCompleteProfileComponent
            },
            {
                path: 'answer-question',
                component: PageAnswerQuestionComponent,
                canActivate: [
                    RequireProfileCompleteService,
                ]
            },
            {
                path: 'teams',
                component: PageOppHomeTeamsComponent,
                resolve: {
                    teams: ResolveTeamByOppKey,
                    appTeams: ResolveApplicationTeamByAppKey
                },
               /*  canActivate: [
                    RequireProfileCompleteService,
                ], */
                children: [
                    {
                        path: '',
                        component: PageOppTeamsComponent
                    },                   
                    {
                        path: ':teamKey',
                        component: PageOppTeamComponent,
                        resolve: {
                            team: ResolveTeamByTeamKey
                        }
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplyRoutingModule { }

export const routedComponents = [
    PageCompleteProfileComponent, 
    PageAnswerQuestionComponent,
    PageOppHomeTeamsComponent, 
    PageOppTeamsComponent, 
    PageOppTeamComponent,
    OppTeamsSelectedComponent,
    OppTeamsNotSelectedComponent
];
