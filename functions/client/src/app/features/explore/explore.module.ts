import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { ExploreRoutingModule, routedComponents } from './explore-routing.module'
import { StoreModule } from '@ngrx/store'

// import { reducer } from '../../store/reducer'
export function reducer(state = {}) { return state }

@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    CommonModule,
    SNUIModule,
    ExploreRoutingModule,
    StoreModule.forFeature('explore', reducer)
  ],
})
export class ExploreModule { }

