import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { HomeRoutingModule, routedComponents } from './home-routing.module'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    SNUIModule,
    HomeRoutingModule,
  ],
  providers: [],
})
export class HomeModule { }

