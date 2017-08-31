import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Opp } from "../../../../../../universal/domain/opp";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../../../../../../universal/domain/project";
import { Benefit } from "../../../../../../universal/domain/benefit";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { ApplicationActionService } from "../../../core/sndomain/application/application-action.service";
import { ApplicationStatus } from "../../../../../../universal/domain/application";

@Component({
    templateUrl: 'page-opp-application-cancel.component.html'
})

export class PageOppApplicationCancelComponent implements OnInit {
    public opp: Observable<Opp>;
    public project: Observable<Project>
    public benefits: Observable<Benefit[]>;
    public actionBarType = ActionBarType;
    private applicationKey: string;

    constructor(
        public route: ActivatedRoute,
        public applicationAction: ApplicationActionService,
        public router: Router
    ) { }

    ngOnInit() {
        this.route.parent.data.subscribe(data => {
            this.opp = data['opp'];
            this.project = data['project'];
            this.benefits = data['benefits'];
        });
        this.applicationKey = this.route.snapshot.params["applicationKey"];
    }

    save() {
        if (this.applicationKey)
            this.applicationAction.changeStatus(this.applicationKey, ApplicationStatus.Canceled)
                .subscribe(
                () => this.router.navigate(["../",'cancel-confirmation'], {relativeTo: this.route})
                );
    }
}