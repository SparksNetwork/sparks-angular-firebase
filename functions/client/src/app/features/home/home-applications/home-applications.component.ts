import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { Project } from '../../../../../../universal/domain/project'
import { Application, ApplicationStatus } from '../../../../../../universal/domain/application'

@Component({
    selector: 'home-applications',
    templateUrl: 'home-applications.component.html'
})

export class HomeApplicationsComponent {
  @Input() apps: Application[]

    // constructor(private router: Router) {

    // }

    // getApplicationByProjectkey(projectKey: string) {
    //     // if (!this.applications || !this.applications.length || !projectKey) return;

    //     return this.applications.find(application => application.projectKey === projectKey);
    // }
}
