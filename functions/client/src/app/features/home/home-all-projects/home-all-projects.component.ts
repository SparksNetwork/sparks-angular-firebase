import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { Project } from "../../../../../../universal/domain/project";
import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";

@Component({
    selector: 'home-all-projects',
    templateUrl: 'home-all-projects.component.html'
})

export class HomeAllProjectsComponent {
    @Input() projects: Project[];
    @Input() applications: Application[];

    constructor(private router: Router) {

    }

    getApplicationByProjectkey(projectKey: string) {
        // if (!this.applications || !this.applications.length || !projectKey) return;

        return this.applications.find(application => application.projectKey === projectKey);
    }
}