import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SnuiHeaderFullComponent } from './components/snui-header-full.component'
import { SnuiStrikebehindComponent } from './components/snui-strikebehind.component'

const COMPONENTS = [
  SnuiHeaderFullComponent,
  SnuiStrikebehindComponent,
]

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [
  ]
})
export class SnuiModule { }
