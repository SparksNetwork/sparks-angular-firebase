import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashComponent } from './dash.component';
import { RequireAuth } from '../../core/snauth/require-auth/require-auth.service'
import { RequireEmailVerification } from "../../core/snauth/require-email-verification/require-email-verification.service";

const routes: Routes = [
  {
    path: '',
    component: DashComponent,
    canActivate: [
      RequireAuth,
      RequireEmailVerification,
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashRoutingModule { }

export const routedComponents = [DashComponent];