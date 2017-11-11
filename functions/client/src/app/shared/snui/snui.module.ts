import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { HeaderSimpleComponent } from './header-simple/header-simple.component'

import { LocationPipe } from '../pipes/location.pipe';
import { ApplicationStatusPipe } from '../pipes/application-status.pipe';
import { HeaderCarouselComponent } from './header-carousel/header-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { CardItemComponent } from './card-item/card-item.component';
import { ActionBarComponent } from './action-bar/action-bar.component'
import { BtnDirective } from './btn/btn.directive'
import { ProjectCardItemComponent } from './project-card-item/project-card-item.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { TeamCardItemComponent } from './team-card-item/team-card-item.component';
import { ProjectLinksComponent } from './project-links/project-links.component';
import { PageMessageComponent } from './page-message/page-message.component';
import { DateIntervalPipe } from '../pipes/date-interval.pipe';
import { DateFormatPipe } from 'angular2-moment';
import { DateTimeIntervalPipe } from '../pipes/date-time-interval.pipe';
import { SortShiftsByDatePipe } from '../pipes/sort-shifts.pipe';
import {
  ProjectTitleComponent
} from './project'
import {
  OppTitleComponent
} from './opp'
import {
  SubheadingComponent
} from './subheading/subheading.component'
import {
  SeparatorComponent
} from './separator/separator.component'
import {
  RowIconComponent
} from './row-icon/row-icon.component'


import {
  HeaderFullComponent,
} from './components'

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
  DateIntervalPipe,
  DateTimeIntervalPipe,
  SortShiftsByDatePipe,
  ProjectTitleComponent,
  OppTitleComponent,
  SubheadingComponent,
  SeparatorComponent,
  RowIconComponent,

  HeaderFullComponent,
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
  providers: [
    DateFormatPipe,
    DateIntervalPipe
  ]
})
export class SNUIModule { }
