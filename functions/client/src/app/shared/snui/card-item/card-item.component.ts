import { Component, OnInit, Input } from '@angular/core';
import { CardItemStatus } from "../../../../../../shared/enums/card-item-status.enum";

@Component({
  selector: 'snui-card-item',
  templateUrl: './card-item.component.html'
})
export class CardItemComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() summary: string;
  @Input() icon: string;
  @Input() status: CardItemStatus;

  cardItemStatus = CardItemStatus;

  constructor() { }

  ngOnInit() {
  }

}
