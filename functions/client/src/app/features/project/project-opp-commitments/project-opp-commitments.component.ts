import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Benefit } from "../../../../../../universal/domain/benefit";
import { Contrib } from "../../../../../../universal/domain/contrib";

@Component({
    selector: 'project-opp-commitments',
    templateUrl: 'project-opp-commitments.component.html'
})

export class ProjectOppCommitmentsComponent implements OnChanges {
    @Input() benefits: Benefit[];
    @Input() contribs: Contrib[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
    }
}