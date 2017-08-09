import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from "../../../../../../universal/domain/project";

@Component({
    selector: 'home-all-projects',
    templateUrl: 'home-all-projects.component.html'
})

export class HomeAllProjectsComponent implements OnChanges {
    @Input() projects: Project[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.projects){
            console.log(this.projects);
        }
    }
}