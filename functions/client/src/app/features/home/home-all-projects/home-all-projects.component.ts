import { Component, Input } from '@angular/core';
import { Project } from "../../../../../../universal/domain/project";
import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";

@Component({
    selector: 'home-all-projects',
    templateUrl: 'home-all-projects.component.html'
})

export class HomeAllProjectsComponent {
    @Input() projects: Project[];
    @Input() applications: Application[];

    constructor() {

    }

    getStatusByProjectKey(projectKey: string) {
        if (!this.applications || !this.applications.length || !projectKey) return;

        const application = this.applications.find(application => application.projectKey == projectKey);
        if (application) return this.getStatusDisplay(application.status);
    }

    getStatusDisplay(status: ApplicationStatus) {
        switch (status) {
            case ApplicationStatus.Incomplete:
                return "Incomplete";
            default: return null;
        }
    }

}