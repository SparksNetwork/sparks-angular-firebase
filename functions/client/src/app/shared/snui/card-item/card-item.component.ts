import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'snui-card-item',
  templateUrl: './card-item.component.html'
})
export class CardItemComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() description: string;
  @Input() summary: string;
  @Input() icon: string;
  @Input() status: string;
  @Input() benefitValue: number;

  constructor() { }

  ngOnInit() {
  }

}
