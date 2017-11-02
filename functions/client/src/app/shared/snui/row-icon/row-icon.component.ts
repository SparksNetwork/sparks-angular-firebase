import { Component, Input } from '@angular/core';

@Component({
  selector: 'snui-row-icon',
  templateUrl: 'row-icon.component.html',
  styleUrls: ['./row-icon.component.scss'],
})

export class RowIconComponent {
  @Input() icon = ''
  constructor() { }
}
