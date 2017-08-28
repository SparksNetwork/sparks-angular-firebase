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
} from "../../core/sndomain/team/resolve-team-by-opp-key.service";

// import {
//   ResolveContribByOppKey,
// } from '../../core/sndomain/contrib'

import { PageProjectsComponent } from './page-projects/page-projects.component'
import { PageProjectHomeComponent } from './page-project-home/page-project-home.component'
import { PageProjectHomeAllOppsComponent } from './page-project-home-all-opps/page-project-home-all-opps.component'
import { PageProjectHomeSingleOppComponent } from './page-project-home-single-opp/page-project-home-single-opp.component'
import { PageProjectHomeEditComponent } from './page-project-home-edit/page-project-home-edit.component'
import { PageProjectOppComponent } from './page-project-opp/page-project-opp.component'

import { PageProjectHomeAllOppsGuard } from './page-project-home-all-opps-guard/page-project-home-all-opps-guard.service'
import { ResolveFirstOpp } from './resolve-first-opp/resolve-first-opp.service'
import { ResolveContribByFirstOpp } from './resolve-contrib-by-first-opp/resolve-contrib-by-first-opp.service'
import { ResolveBenefitByFirstOpp } from "./resolve-benefit-by-first-opp/resolve-benefit-by-first-opp.service";
import { ResolveTeamByFirstOpp } from "./resolve-team-by-first-opp/resolve-team-by-first-opp.service";

import { AddToCalendarComponent } from './add-to-calendar/add-to-calendar.component'
import { ProjectTitleComponent } from './project-title/project-title.component';
import { ProjectDateComponent } from './project-date/project-date.component';
import { ProjectLocationComponent } from "./project-location/project-location.component";
import { ProjectDescriptionComponent } from "./project-description/project-description.component";
import { ProjectOppDetailComponent } from "./project-opp-detail/project-opp-detail.component";
import { ProjectOppTeamsComponent } from "./project-opp-teams/project-opp-teams.component";
import { ProjectOppVisitRequirementsComponent } from "./project-opp-visit-requirements/project-opp-visit-requirements.component";
import { ResolveBenefitByOppKey } from "../../core/sndomain/benefit/resolve-benefit-by-opp-key.service";
import { ResolveContribByOppKey } from "../../core/sndomain/contrib/resolve-contrib-by-opp-key.service";
import { ProjectOrganizerComponent } from "./project-organizer/project-organizer.component";
import { ActionbarOppJoinComponent } from './actionbar-opp-join/actionbar-opp-join.component'
import { ResolveApplicationByProjectProfileKey } from "../../core/sndomain/application/resolve-applications-by-project-profile-key.service";
import { ProjectOppCardComponent } from "./project-opp-card/project-opp-card.component";

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
        children: [
          {
            path: '',
            component: PageProjectHomeAllOppsComponent,
            resolve: {
              application: ResolveApplicationByProjectProfileKey
            },
            canActivate: [
              PageProjectHomeAllOppsGuard,
            ]
          },
          {
            path: 'edit',
            component: PageProjectHomeEditComponent,
          },
          {
            path: 'join',
            component: PageProjectHomeSingleOppComponent,
            resolve: {
              opp: ResolveFirstOpp,
              teams: ResolveTeamByFirstOpp,
              contribs: ResolveContribByFirstOpp,
              benefits: ResolveBenefitByFirstOpp
            }
          },
        ],
      },
      {
        path: 'opp/:oppKey',
        component: PageProjectOppComponent,
        resolve: {
          opp: ResolveOppByOppKey,
          teams: ResolveTeamByOppKey,
          benefits: ResolveBenefitByOppKey,
          contribs: ResolveContribByOppKey
        },
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
  PageProjectHomeAllOppsComponent,
  PageProjectHomeSingleOppComponent,
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
  ProjectOrganizerComponent
];