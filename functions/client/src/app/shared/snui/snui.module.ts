import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { SnuiHeaderFullComponent } from './components/snui-header-full.component'
import { SnuiStrikebehindComponent } from './components/snui-strikebehind.component'
import { SnuiActionButtonsComponent } from './components/snui-action-buttons.component'

import { SnuiInputDirective } from './directives/snui-input.directive'

const COMPONENTS = [
  SnuiHeaderFullComponent,
  SnuiStrikebehindComponent,
  SnuiActionButtonsComponent,

  SnuiInputDirective,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [
  ]
})
export class SnuiModule { }
