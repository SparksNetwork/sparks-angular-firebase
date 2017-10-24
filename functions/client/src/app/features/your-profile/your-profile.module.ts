import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { YourApplicationRoutingModule, routedComponents } from './your-profile-routing.module'
import { HeaderComponent } from './header/header.component'

@NgModule({
  declarations: [
    ...routedComponents,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SNUIModule,
    YourApplicationRoutingModule,
  ],
  providers: [],
})
export class YourProfileModule { }

