import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'snui-team-card-item',
    templateUrl: 'team-card-item.component.html'
})

export class TeamCardItemComponent implements OnInit {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() icon: string = '';

    constructor() { }

    ngOnInit() { }
}