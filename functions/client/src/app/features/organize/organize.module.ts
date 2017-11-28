import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiModule } from 'ng2-semantic-ui'
import { SnuiModule } from '../../shared/snui/snui.module'

import { OrganizeRoutingModule, routedComponents } from './organize.routing'

// import { AppbarStateService } from './appbar.state'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    OrganizeRoutingModule,
    SuiModule,
    SnuiModule,
  ],
  providers: [
    // AppbarStateService,
  ],
})
export class OrganizeModule { }

