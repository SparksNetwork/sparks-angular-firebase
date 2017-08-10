import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ResolveOppByProjectKey,
} from '../../core/sndomain/opp'

import { RequireAuth } from '../../core/snauth/require-auth/require-auth.service'
import { RequireEmailVerification } from "../../core/snauth/require-email-verification/require-email-verification.service";
import { PageCompleteProfileComponent } from "./page-complete-profile/page-complete-profile.component";
import { ResolveTeamByOppKey } from "../../core/sndomain/team/resolve-team-by-opp-key.service";
import { PageOppTeamsComponent } from "./page-opp-teams/page-opp-teams.component";

const routes: Routes = [
    {
        path: ':oppKey',
        canActivate: [
        //    RequireAuth,
        //    RequireEmailVerification,
        ],
        resolve: {
            opps: ResolveOppByProjectKey
        },
        children: [
            {
                path: 'complete-profile',
                component: PageCompleteProfileComponent
            },
            {
                path: 'teams',
                component: PageOppTeamsComponent,
                resolve: {
                    teams: ResolveTeamByOppKey
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplyRoutingModule { }

export const routedComponents = [PageCompleteProfileComponent, PageOppTeamsComponent];