import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderSimpleComponent } from './header-simple/header-simple.component'

import { LocationPipe } from "../pipes/location.pipe";
import { HeaderCarouselComponent } from "./header-carousel/header-carousel.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CardItemComponent } from "./card-item/card-item.component";
import { OpportunityCommitmentsComponent } from "./opportunity-commitments/opportunity-commitments.component";
import { ActionBarComponent } from './action-bar/action-bar.component'
import { BtnDirective } from './btn/btn.directive'

const COMPONENTS = [
  HeaderSimpleComponent,
  ActionBarComponent,
  BtnDirective,
  HeaderCarouselComponent,
  CardItemComponent,
  OpportunityCommitmentsComponent,
  LocationPipe
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
