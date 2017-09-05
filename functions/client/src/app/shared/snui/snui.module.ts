import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { HeaderSimpleComponent } from './header-simple/header-simple.component'

import { LocationPipe } from "../pipes/location.pipe";
import { ApplicationStatusPipe } from "../pipes/application-status.pipe";
import { HeaderCarouselComponent } from "./header-carousel/header-carousel.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { CardItemComponent } from "./card-item/card-item.component";
import { ActionBarComponent } from './action-bar/action-bar.component'
import { BtnDirective } from './btn/btn.directive'
import { ProjectCardItemComponent } from "./project-card-item/project-card-item.component";
import { UserHeaderComponent } from "./user-header/user-header.component";
import { TeamCardItemComponent } from "./team-card-item/team-card-item.component";
import { ProjectLinksComponent } from "./project-links/project-links.component";
import { PageMessageComponent } from "./page-message/page-message.component";

const COMPONENTS = [
  HeaderSimpleComponent,
  ActionBarComponent,
  BtnDirective,
  HeaderCarouselComponent,
  CardItemComponent,
  LocationPipe,
  ApplicationStatusPipe,
  ProjectCardItemComponent,
  UserHeaderComponent,
  TeamCardItemComponent,
  ProjectLinksComponent,
  PageMessageComponent,
]

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    CollapseModule,
    RouterModule
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: []
})
export class SNUIModule { }
