import { Component, ViewChild } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap/modal'

import { SorryService } from './sorry.service'

@Component({
  selector: 'sorry-modal-sorry',
  templateUrl: 'modal-sorry.component.html'
})

export class ModalSorryComponent {
  @ViewChild('modalSorry') public modalSorry: ModalDirective
  constructor(
    public sorry: SorryService
  ) {
    this.sorry.isSorry.subscribe(isSorry => isSorry && this.modalSorry.show())
  }
}
