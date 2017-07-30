import { NgModule } from '@angular/core';
import { SNUIModule } from '../../shared/snui/snui.module'
import { AppbarRoutingModule, routedComponents } from './appbar-routing.module'

@NgModule({
  declarations: routedComponents,
  imports: [
    SNUIModule,
    AppbarRoutingModule,
  ],
  providers: [],
})
export class AppbarModule { }

