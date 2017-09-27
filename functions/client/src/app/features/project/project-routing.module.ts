import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import {
  ResolveProjectByProjectKey,
  ResolveProjectAll,
} from '../../core/sndomain/project'

import {
  ResolveOppByProjectKey,
  ResolveOppByOppKey,
} from '../../core/sndomain/opp'

import {
  ResolveTeamByOppKey
} from '../../core/sndomain/team/resolve-team-by-opp-key.service';

// import {
//   ResolveContribByOppKey,
// } from '../../core/sndomain/contrib'

import { PageProjectsComponent } from './page-projects/page-projects.component'
import { PageProjectHomeComponent } from './page-project-home/page-project-home.component'
import { PageProjectHomeEditComponent } from './page-project-home-edit/page-project-home-edit.component'
import { PageProjectOppComponent } from './page-project-opp/page-project-opp.component'

import { ResolveFirstOpp } from './resolve-first-opp/resolve-first-opp.service'
import { ResolveContribByFirstOpp } from './resolve-contrib-by-first-opp/resolve-contrib-by-first-opp.service'
import { ResolveBenefitByFirstOpp } from './resolve-benefit-by-first-opp/resolve-benefit-by-first-opp.service';
import { ResolveTeamByFirstOpp } from './resolve-team-by-first-opp/resolve-team-by-first-opp.service';

import { AddToCalendarComponent } from './add-to-calendar/add-to-calendar.component'
import { ProjectTitleComponent } from './project-title/project-title.component';
import { ProjectDateComponent } from './project-date/project-date.component';
import { ProjectLocationComponent } from './project-location/project-location.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { ProjectOppDetailComponent } from './project-opp-detail/project-opp-detail.component';
import { ProjectOppTeamsComponent } from './project-opp-teams/project-opp-teams.component';
import { ProjectOppVisitRequirementsComponent } from './project-opp-visit-requirements/project-opp-visit-requirements.component';
import { ResolveBenefitByOppKey } from '../../core/sndomain/benefit/resolve-benefit-by-opp-key.service';
import { ResolveContribByOppKey } from '../../core/sndomain/contrib/resolve-contrib-by-opp-key.service';
import { ProjectOrganizerComponent } from './project-organizer/project-organizer.component';
import { ActionbarOppJoinComponent } from './actionbar-opp-join/actionbar-opp-join.component'
import { ResolveApplicationByProjectKey } from '../../core/sndomain/application/resolve-application-by-project-key.service';
import { ProjectOppCardComponent } from './project-opp-card/project-opp-card.component';
import { PageOppApplicationCancelComponent } from './page-opp-application-cancel/page-opp-application-cancel.component';
import { ProjectOppBenefitsComponent } from './project-opp-benefits/project-opp-benefits.component';
import { PageOppApplicationCancelConfirmationComponent } from './page-opp-application-cancel-confirmation/page-opp-application-cancel-confirmation.component';
import { RequireAuth } from '../../core/snauth/require-auth/require-auth.service';
import { RequireEmailVerification } from '../../core/snauth/require-email-verification/require-email-verification.service';

const routes: Routes = [
  {
    path: '',
    component: PageProjectsComponent,
    resolve: {
      projects: ResolveProjectAll,
    }
  },
  {
    path: ':projectKey',
    resolve: {
      project: ResolveProjectByProjectKey,
      opps: ResolveOppByProjectKey,
    },
    children: [
      {
        path: '',
        component: PageProjectHomeComponent,
        resolve: {
          application: ResolveApplicationByProjectKey,
          teams: ResolveTeamByFirstOpp,
          contribs: ResolveContribByFirstOpp,
          benefits: ResolveBenefitByFirstOpp,
        },
        // children: [
        //   {
        //     path: '',
        //     component: PageProjectHomeAllOppsComponent,
        //     resolve: {
        //       application: ResolveApplicationByProjectKey,
        //       teams: ResolveTeamByFirstOpp,
        //       contribs: ResolveContribByFirstOpp,
        //       benefits: ResolveBenefitByFirstOpp,
        //     },
        //   },
        // ],
      },
      {
        path: 'opp/:oppKey',
        resolve: {
          opp: ResolveOppByOppKey,
          teams: ResolveTeamByOppKey,
          benefits: ResolveBenefitByOppKey,
          contribs: ResolveContribByOppKey,
          application: ResolveApplicationByProjectKey
        },
        children: [
          {
            path: '',
            component: PageProjectOppComponent
          },
          {
            path: 'cancel',
            component: PageOppApplicationCancelComponent,
            canActivate: [
              RequireAuth,
              RequireEmailVerification,
            ],
          },
          {
            path: 'join/cancel',
            component: PageOppApplicationCancelComponent,
            canActivate: [
              RequireAuth,
              RequireEmailVerification,
            ],
          },
          {
            path: 'cancel-confirmation',
            component: PageOppApplicationCancelConfirmationComponent,
            canActivate: [
              RequireAuth,
              RequireEmailVerification,
            ],
          },
          {
            path: 'join/cancel-confirmation',
            component: PageOppApplicationCancelConfirmationComponent,
            canActivate: [
              RequireAuth,
              RequireEmailVerification,
            ],
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }

export const routedComponents = [
  PageProjectsComponent,

  PageProjectHomeComponent,
  PageProjectHomeEditComponent,
  PageProjectOppComponent,
  ProjectOppDetailComponent,
  ProjectOppTeamsComponent,
  ProjectOppCardComponent,

  AddToCalendarComponent,
  ProjectTitleComponent,
  ProjectDateComponent,
  ProjectLocationComponent,
  ProjectDescriptionComponent,
  ActionbarOppJoinComponent,

  ProjectOppVisitRequirementsComponent,
  ProjectOrganizerComponent,

  PageOppApplicationCancelComponent,
  ProjectOppBenefitsComponent,
  PageOppApplicationCancelConfirmationComponent
];
