import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { PageApplicationComponent } from './page-application/page-application.component'

import { ResolveApplicationByKey } from '../../core/sndomain/application/resolve-application-by-key.service'

const routes: Routes = [
  {
    path: ':applicationKey',
    component: PageApplicationComponent,
    resolve: {
      app: ResolveApplicationByKey,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourApplicationRoutingModule { }

export const routedComponents = [
  PageApplicationComponent,
]
