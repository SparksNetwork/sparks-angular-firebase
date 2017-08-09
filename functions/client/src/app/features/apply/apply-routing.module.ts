import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ResolveOppByOppKey,
} from '../../core/sndomain/opp'

import { RequireAuth } from '../../core/snauth/require-auth/require-auth.service'
import { RequireEmailVerification } from "../../core/snauth/require-email-verification/require-email-verification.service";
import { PageCompleteProfileComponent } from "./page-complete-profile/page-complete-profile.component";


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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplyRoutingModule { }

export const routedComponents = [ PageCompleteProfileComponent ];