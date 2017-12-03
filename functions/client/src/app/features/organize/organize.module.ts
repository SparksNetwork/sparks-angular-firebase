import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SuiModule } from 'ng2-semantic-ui'
import { SnuiModule } from '../../shared/snui/snui.module'

import { OrganizeRoutingModule, routedComponents } from './organize.routing'
import { OrganizeStateService } from './organize.state'
import { OrganizeHeaderStateService } from './components/organize-header.state'

import { DummyComponent } from './dummy.component'
import { OrganizeHeaderFullComponent } from './components/organize-header-full.component'
import { OrganizeTeamCardComponent } from './components/organize-team-card.component'

import { reducer } from './organize.reducer'

@NgModule({
  declarations: [
    routedComponents,
    DummyComponent,
    OrganizeHeaderFullComponent,
    OrganizeTeamCardComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('organize', reducer),
    EffectsModule.forFeature([OrganizeStateService]),
    OrganizeRoutingModule,
    SuiModule,
    SnuiModule,
  ],
  providers: [
    OrganizeStateService,
    OrganizeHeaderStateService,
  ],
})
export class OrganizeModule { }

