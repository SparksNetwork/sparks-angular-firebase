import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { HomeRoutingModule, routedComponents } from './home-routing.module'

import { HomeAllProjectsComponent } from './home-all-projects/home-all-projects.component'
import { HomeApplicationsComponent } from './home-applications/home-applications.component'

@NgModule({
  declarations: [
    HomeAllProjectsComponent,
    HomeApplicationsComponent,
    ...routedComponents
  ],
  imports: [
    CommonModule,
    SNUIModule,
    HomeRoutingModule,
  ],
  providers: [],
})
export class HomeModule { }

