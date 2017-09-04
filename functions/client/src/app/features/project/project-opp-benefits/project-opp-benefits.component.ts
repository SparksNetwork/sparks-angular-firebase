import { Component, Input } from '@angular/core';
import { Project } from "../../../../../../universal/domain/project";
import { Benefit } from "../../../../../../universal/domain/benefit";
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
    selector: 'project-opp-benefits',
    templateUrl: 'project-opp-benefits.component.html'
})

export class ProjectOppBenefitsComponent{
    @Input() project: Project
    @Input() benefits: Benefit[];
    @Input() opp: Opp;
    @Input() title: string = ''
}