import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule, routedComponents } from './my-profile.routing'

// import { AppbarStateService } from './appbar.state'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    MyProfileRoutingModule,
  ],
  providers: [
    // AppbarStateService,
  ],
})
export class MyProfileModule { }

