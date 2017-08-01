import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderSimpleComponent } from './header-simple/header-simple.component'
import { LocationPipe } from "../pipes/location.pipe";
import { HeaderCarouselComponent } from "./header-carousel/header-carousel.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';

const COMPONENTS = [
  HeaderSimpleComponent,
  HeaderCarouselComponent,
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
