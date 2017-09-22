import { Component, OnInit } from '@angular/core';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Project } from '../../../../../../universal/domain/project';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'page-apply-confirmation.component.html'
})

export class PageApplyConfirmationComponent implements OnInit {
    public actionBarType = ActionBarType;
    public project: FirebaseObjectObservable<Project>;

    constructor(public route: ActivatedRoute) {

     }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.project = data['project'];
        })
    }
}