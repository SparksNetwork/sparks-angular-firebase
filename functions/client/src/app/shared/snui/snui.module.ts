import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderSimpleComponent } from './header-simple/header-simple.component'
import { LocationPipe } from "./pipes/location.pipe";

const COMPONENTS = [
  HeaderSimpleComponent,
  LocationPipe
]

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: []
})
export class SNUIModule { }
