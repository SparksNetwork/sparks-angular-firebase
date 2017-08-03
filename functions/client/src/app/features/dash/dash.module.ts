import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { DashRoutingModule, routedComponents } from './dash-routing.module'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    SNUIModule,
    DashRoutingModule,
  ],
  providers: [],
})
export class DashModule { }

