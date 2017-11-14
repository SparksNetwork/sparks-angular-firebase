import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule, routedComponents } from './my-profile.routing'

import { MyProfileStateService } from './my-profile.state'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    MyProfileRoutingModule,
  ],
  providers: [
    MyProfileStateService,
  ],
})
export class MyProfileModule { }

