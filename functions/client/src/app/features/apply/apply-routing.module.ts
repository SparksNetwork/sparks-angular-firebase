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
import { PageAnswerQuestionComponent } from './page-answer-question/page-answer-question.component'
import { ResolveTeamByTeamKey } from "./resolve-team-by-team-key/resolve-team-by-team-key.service";
import { RequireProfileCompleteService, ResolveProfile } from '../../core/sndomain/profile'
import { ResolveApplicationTeamByAppKey } from "../../core/sndomain/applicationTeam/resolve-application-team-by-app-key.service";
import { ResolveApplicationByKey } from "../../core/sndomain/application/resolve-application-by-key.service";
import { PageReviewDetailComponent } from "./page-review-detail/page-review-detail.component";
import { PageApplyConfirmationComponent } from "./page-apply-confirmation/page-apply-confirmation.component";
import { ResolveProjectByOpp } from "../../core/sndomain/project/resolve-project-by-opp.service";
import { PageShiftComponent } from './page-shift/page-shift.component';
import { ResolveShiftByApplicationKey } from "./resolve-shift-by-app-key/resolve-shifts-by-application-key.service";
import { RequireApplicationAcceptedService } from "../../core/sndomain/shift/require-application-accepted.service";
import { PageMessageComponent } from "../../shared/snui/page-message/page-message.component";


const routes: Routes = [
    {
        path:"application-pending",
        component: PageMessageComponent
    },
    {
        path: ':oppKey',
        canActivate: [
            RequireAuth,
            RequireEmailVerification,
        ],
        resolve: {
            opp: ResolveOppByOppKey,
            profile: ResolveProfile
        },
        children: [
            {
                path: 'complete-profile',
                component: PageCompleteProfileComponent,
                resolve: {
                    profile: ResolveProfile
                }
            },
            {
                path: 'answer-question',
                component: PageAnswerQuestionComponent,
                canActivate: [
                    RequireProfileCompleteService,
                ]
            },
            {
                path: 'application/:applicationKey',
                resolve: {
                    teams: ResolveTeamByOppKey,
                    appTeams: ResolveApplicationTeamByAppKey,
                    application: ResolveApplicationByKey
                },
                canActivate: [
                    RequireProfileCompleteService,
                ],
                children: [
                    {
                        path: 'teams',
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
                    },
                    {
                        path: 'review-detail',
                        component: PageReviewDetailComponent
                    },
                    {
                        path: 'apply-cofirmation',
                        component: PageApplyConfirmationComponent,
                        resolve: {
                            project: ResolveProjectByOpp
                        }
                    },
                    {
                        path: 'edit-profile',
                        component: PageCompleteProfileComponent
                    },
                    {
                        path: 'answer-question',
                        component: PageAnswerQuestionComponent
                    },
                    {

                        path: 'shift',
                        component: PageShiftComponent,
                        resolve: {
                            shift: ResolveShiftByApplicationKey,
                            project: ResolveProjectByOpp
                        },
                        canActivate:[
                            RequireApplicationAcceptedService
                        ]
                    },
                    {
                        path: 'edit-answer',
                        component: PageAnswerQuestionComponent
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
    PageOppTeamsComponent,
    PageOppTeamComponent,
    PageReviewDetailComponent,
    PageApplyConfirmationComponent,
    PageShiftComponent,
    PageApplyConfirmationComponent,
];
