import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { OppHeaderDetailsComponent } from "./opp-header-details/opp-header-details.component";
import { ResolveOppByProjectKey } from "../../core/sndomain/opp/resolve-opp-by-project-key.service";

const routes: Routes = [
  {
    path: '',
    component: OppHeaderDetailsComponent,
    resolve: {
      projects: ResolveOppByProjectKey,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OppRoutingModule { }

export const routedComponents = [
    OppHeaderDetailsComponent
];