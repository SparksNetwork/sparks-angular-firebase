import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SnuiHeaderFullComponent } from './components/snui-header-full.component'

const COMPONENTS = [
  SnuiHeaderFullComponent
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
