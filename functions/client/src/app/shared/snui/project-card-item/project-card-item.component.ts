import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'snui-project-card-item',
    templateUrl: 'project-card-item.component.html'
})

export class ProjectCardItemComponent implements OnInit {
    @Input() startDateTime: string;
    @Input() endDateTime: string;
    @Input() title: string
    @Input() location: string
    constructor() { }

    ngOnInit() { }
}