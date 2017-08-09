import { Component, Input } from '@angular/core';
import { Project } from "../../../../../../universal/domain/project";

@Component({
    selector: 'home-all-projects',
    templateUrl: 'home-all-projects.component.html'
})

export class HomeAllProjectsComponent {
    @Input() projects: Project[];

    constructor() { }

}