import { NgModule } from '@angular/core';
import { SNUIModule } from '../../shared/snui/snui.module'
import { HomeRoutingModule, routedComponents } from './home-routing.module'

@NgModule({
  declarations: routedComponents,
  imports: [
    SNUIModule,
    HomeRoutingModule,
  ],
  providers: [],
})
export class HomeModule { }

