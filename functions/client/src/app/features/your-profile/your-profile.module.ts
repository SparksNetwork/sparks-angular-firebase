import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { YourApplicationRoutingModule, routedComponents } from './your-profile-routing.module'

@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    CommonModule,
    SNUIModule,
    YourApplicationRoutingModule,
  ],
  providers: [],
})
export class YourProfileModule { }

