import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { ExploreRoutingModule, routedComponents } from './explore-routing.module'
import { StoreModule } from '@ngrx/store'

import { CardProjectComponent } from './card-project.component'
import { HeaderHomeComponent } from './header-home.component'
import { AppbarComponent } from './appbar.component'

// import { reducer } from '../../store/reducer'
export function reducer(state = {}) { return state }

@NgModule({
  declarations: [
    ...routedComponents,
    CardProjectComponent,
    HeaderHomeComponent,
    AppbarComponent,
  ],
  imports: [
    CommonModule,
    SNUIModule,
    ExploreRoutingModule,
    StoreModule.forFeature('explore', reducer)
  ],
})
export class ExploreModule { }

