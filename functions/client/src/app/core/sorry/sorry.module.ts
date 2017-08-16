import { NgModule } from '@angular/core'
import { ModalModule } from 'ngx-bootstrap/modal'

import { ModalSorryComponent } from './modal-sorry.component'
import { SorryService } from './sorry.service'

@NgModule({
  imports: [
    ModalModule.forRoot(),
  ],
  exports: [
    ModalSorryComponent,
  ],
  declarations: [
    ModalSorryComponent,
  ],
  providers: [
    SorryService,
  ],
})
export class SorryModule { }
