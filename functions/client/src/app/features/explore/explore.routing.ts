import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ExploreHomePageComponent } from './components/explore-home-page.component'

const routes: Routes = [
  {
    path: '',
    component: ExploreHomePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule { }

export const routedComponents = [
  ExploreHomePageComponent,
]
