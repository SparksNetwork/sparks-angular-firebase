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
import { ResolveContribByFirstOpp } from './resolve-contrib-by-first-opp/resolve-contrib-by-first-opp.service'
import { ResolveBenefitByFirstOpp } from "./resolve-benefit-by-first-opp/resolve-benefit-by-first-opp.service";

import { AddToCalendarComponent } from './add-to-calendar/add-to-calendar.component'
import { ProjectTitleComponent } from './project-title/project-title.component';
import { ProjectDateComponent } from './project-date/project-date.component';
import { ProjectLocationComponent } from "./project-location/project-location.component";
import { ProjectDescriptionComponent } from "./project-description/project-description.component";

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
        }
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

  AddToCalendarComponent,
  ProjectTitleComponent,
  ProjectDateComponent,
  ProjectLocationComponent,
  ProjectDescriptionComponent
];