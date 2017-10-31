import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { OrganizeRoutingModule, routedComponents } from './organize-routing.module'
import { StoreModule } from '@ngrx/store'
import { SuiModule } from 'ng2-semantic-ui'

// import { reducer } from '../../store/reducer'
export function reducer(state = {}) { return state }

@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    CommonModule,
    SNUIModule,
    OrganizeRoutingModule,
    StoreModule.forFeature('organize', reducer),
    SuiModule,
  ],
})
export class OrganizeModule { }

