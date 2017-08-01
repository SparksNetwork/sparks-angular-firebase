import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCarouselComponent } from './header-carousel/header-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

const COMPONENTS = [
  HeaderCarouselComponent,
]

@NgModule({
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class SharedModule { }
