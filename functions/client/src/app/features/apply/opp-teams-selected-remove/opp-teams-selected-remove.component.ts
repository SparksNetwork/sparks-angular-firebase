import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OppTeamsSelectService } from "../opp-teams-select.service";

@Component({
    template:``
})

export class OppTeamsSelectedRemoveComponent implements OnInit {

    constructor(
        private oppTeamsSelectService: OppTeamsSelectService,
        private router: Router,
        private route: ActivatedRoute,) { }

    ngOnInit() { 
       //if there is no key, remove all
       this.oppTeamsSelectService.removeAllTeamKeys();
       this.router.navigate(['../'], {relativeTo: this.route}) ;   
    }
}