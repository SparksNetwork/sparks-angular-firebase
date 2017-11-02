import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { PageProfileComponent } from './page-profile/page-profile.component'

import { ResolveApplicationByKey } from '../../core/sndomain/application/resolve-application-by-key.service'
import { ResolveProfile } from '../../core/sndomain/profile/resolve-profile.service'

const routes: Routes = [
  {
    path: '',
    component: PageProfileComponent,
    resolve: {
      profile: ResolveProfile,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourApplicationRoutingModule { }

export const routedComponents = [
  PageProfileComponent,
]
