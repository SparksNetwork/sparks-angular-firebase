import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderSimpleComponent } from './header-simple/header-simple.component'

import { LocationPipe } from "../pipes/location.pipe";
import { HeaderCarouselComponent } from "./header-carousel/header-carousel.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CardItemComponent } from "./card-item/card-item.component";
import { ActionBarComponent } from './action-bar/action-bar.component'
import { BtnDirective } from './btn/btn.directive'
import { ProjectCardItemComponent } from "./project-card-item/project-card-item.component";

const COMPONENTS = [
  HeaderSimpleComponent,
  ActionBarComponent,
  BtnDirective,
  HeaderCarouselComponent,
  CardItemComponent,
  LocationPipe,
  ProjectCardItemComponent
]

@NgModule({
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: []
})
export class SNUIModule { }
