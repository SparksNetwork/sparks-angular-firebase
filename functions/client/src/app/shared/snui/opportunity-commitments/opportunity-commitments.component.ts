import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../../../../../../shared/interfaces/card.model";

@Component({
  selector: 'snui-opportunity-commitments',
  templateUrl: './opportunity-commitments.component.html'
})
export class OpportunityCommitmentsComponent implements OnInit {

  @Input() private benefits: Card[];
  @Input() private contributions: Card[];

  constructor() { }

  ngOnInit() {
  }

}
