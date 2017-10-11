import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ResolveOppByOppKey,
} from '../../core/sndomain/opp'

import { RequireAuth } from '../../core/snauth/require-auth/require-auth.service'
import { RequireEmailVerification } from '../../core/snauth/require-email-verification/require-email-verification.service';
import { PageCompleteProfileComponent } from './page-complete-profile/page-complete-profile.component';
import { ResolveTeamByOppKey } from '../../core/sndomain/team/resolve-team-by-opp-key.service';
import { PageOppTeamsComponent } from './page-opp-teams/page-opp-teams.component';
import { PageOppTeamComponent } from './page-opp-team/page-opp-team.component';
import { PageAnswerQuestionComponent } from './page-answer-question/page-answer-question.component'
import { ResolveTeamByTeamKey } from './resolve-team-by-team-key/resolve-team-by-team-key.service';
import { RequireProfileCompleteService, ResolveProfile } from '../../core/sndomain/profile'
import { PageReviewDetailComponent } from './page-review-detail/page-review-detail.component';
import { PageApplyConfirmationComponent } from './page-apply-confirmation/page-apply-confirmation.component';
import { ResolveProjectByOpp } from '../../core/sndomain/project/resolve-project-by-opp.service';
import { PageShiftComponent } from './page-shift/page-shift.component';
import { ResolveShiftByApplicationTeams } from './resolve-shift-by-application-teams/resolve-shifts-by-application-teams.service';
import { RequireApplicationAcceptedService } from '../../core/sndomain/shift/require-application-accepted.service';
import { PageMessageComponent } from '../../shared/snui/page-message/page-message.component';
import { PagePaymentDetailsComponent } from './page-payment-details/page-payment-details.component';
import { PagePaymentConfirmationComponent } from './page-payment-confirmation/page-payment-confirmation.component';
import { ResolveApplicationShiftByAppKey } from '../../core/sndomain/applicationShift/resolve-application-shift-by-app-key.service';
import { ResolveApplication } from '../../core/sndomain/application/index';
import { ResolveApplicationTeamsByOpp } from './resolve-application-teams-by-opp/resolve-application-teams-by-opp.service';
import { ResolveApplicationShiftsByOpp } from './resolve-application-shifts-by-opp/resolve-application-shifts-by-opp.service';
import { ResolveApplicationTeamByApplication } from '../../core/sndomain/applicationTeam/resolve-application-team-by-application.service'
import { PageTestComponent } from './page-test.component'
import { ResolveContribByOppKey } from '../../core/sndomain/contrib/resolve-contrib-by-opp-key.service'

const routes: Routes = [
    {
        path: ':oppKey',
        canActivate: [
            RequireAuth,
            RequireEmailVerification,
        ],
        resolve: {
            opp: ResolveOppByOppKey,
            profile: ResolveProfile,
        },
        children: [
            {
                path: '',
                resolve: {
                    project: ResolveProjectByOpp,
                },
                children: [
                    {
                        path: 'application-pending',
                        component: PageMessageComponent,
                    },
                    {
                        path: 'complete-profile',
                        component: PageCompleteProfileComponent,
                        data: {
                            navigateTo: 'answer-question'
                        },
                    },
                    {
                        path: '',
                        canActivate: [
                            RequireProfileCompleteService,
                        ],
                        resolve: {
                            application: ResolveApplication,
                        },
                        children: [
                            {
                                path: 'answer-question',
                                component: PageAnswerQuestionComponent,
                                data: {
                                    navigateTo: 'teams'
                                }
                            },
                            {
                                path: 'teams',
                                resolve: {
                                    teams: ResolveTeamByOppKey,
                                    appTeams: ResolveApplicationTeamByApplication,
                                },
                                children: [
                                    {
                                        path: '',
                                        component: PageOppTeamsComponent
                                    },
                                    {
                                        path: ':teamKey',
                                        component: PageOppTeamComponent,
                                        resolve: {
                                            team: ResolveTeamByTeamKey,
                                        }
                                    }
                                ]
                            },
                            {
                                path: 'review-detail',
                                component: PageReviewDetailComponent,
                                resolve: {
                                    teams: ResolveTeamByOppKey,
                                    appTeams: ResolveApplicationTeamByApplication,
                                    // appTeams: ResolveApplicationTeamsByOpp,
                                },
                            },
                            {
                                path: 'edit-profile',
                                component: PageCompleteProfileComponent,
                                data: {
                                    navigateTo: 'review-detail'
                                }
                            },
                            {
                                path: 'edit-answer',
                                component: PageAnswerQuestionComponent,
                                data: {
                                    navigateTo: 'review-detail'
                                }
                            },
                        ]
                    },
                ]
            },


            {
                path: 'apply-confirmation',
                component: PageApplyConfirmationComponent,
                resolve: {
                    project: ResolveProjectByOpp
                },
                canActivate: [
                    RequireProfileCompleteService,
                ],
            },
            {
                path: 'shift',
                resolve: {
                    appTeams: ResolveApplicationTeamsByOpp,
                    project: ResolveProjectByOpp,
                    applicationShift: ResolveApplicationShiftsByOpp,
                    application: ResolveApplication,
                    contribs: ResolveContribByOppKey,
                },
                // canActivate: [
                //     RequireProfileCompleteService,
                //     RequireApplicationAcceptedService
                // ],
                children: [
                    {
                        path: '',
                        component: PageShiftComponent,
                        resolve: {
                            shift: ResolveShiftByApplicationTeams
                        }
                    }
                ]
            },
            {
                path: 'payment-details',
                component: PagePaymentDetailsComponent,
                resolve: {
                    project: ResolveProjectByOpp
                },
                // canActivate: [
                //     RequireProfileCompleteService,
                // ]
            },
            {
                path: 'payment-confirmation',
                component: PagePaymentConfirmationComponent,
                resolve: {
                    project: ResolveProjectByOpp
                },
                // canActivate: [
                //     RequireProfileCompleteService,
                // ]
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
    PagePaymentDetailsComponent,
    PagePaymentConfirmationComponent,
    PageShiftComponent
];
