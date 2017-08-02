import { Component, OnInit, Input } from '@angular/core';
import { ICard } from "../../../../../../shared/interfaces/card.model";

@Component({
  selector: 'snui-opportunity-commitments',
  templateUrl: './opportunity-commitments.component.html'
})
export class OpportunityCommitmentsComponent implements OnInit {

  @Input() private benefits: ICard[];
  @Input() private contributions: ICard[];

  constructor() { }

  ngOnInit() {
  }

}
