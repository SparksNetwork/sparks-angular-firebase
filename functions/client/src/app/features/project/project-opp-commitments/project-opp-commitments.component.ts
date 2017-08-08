import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Benefit } from "../../../../../../universal/domain/benefit";

@Component({
    selector: 'project-opp-commitments',
    templateUrl: 'project-opp-commitments.component.html'
})

export class ProjectOppCommitmentsComponent implements OnChanges {
    @Input() benefits: Benefit[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.benefits){
            console.log(this.benefits);
        }
    }
}