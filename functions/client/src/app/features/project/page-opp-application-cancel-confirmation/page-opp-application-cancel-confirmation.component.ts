import { Component } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { Project } from '../../../../../../universal/domain/project';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: 'page-opp-application-cancel-confirmation.component.html'
})

export class PageOppApplicationCancelConfirmationComponent {
    public actionBarType = ActionBarType;
    public project: Observable<Project>

    constructor(
        public route: ActivatedRoute,
    ) {
    }

    ngOnInit() {

        this.project = this.route.snapshot.data['project'];

    };

}