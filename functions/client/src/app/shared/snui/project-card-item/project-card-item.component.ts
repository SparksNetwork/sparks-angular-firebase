import { Component, OnInit, Input } from '@angular/core';
import { ImageRef } from "../../../../../../universal/domain/imageRef";

@Component({
    selector: 'snui-project-card-item',
    templateUrl: 'project-card-item.component.html'
})

export class ProjectCardItemComponent implements OnInit {
    @Input() startDateTime: string;
    @Input() endDateTime: string;
    @Input() image: ImageRef;
    @Input() title: string;
    @Input() location: Location;
    @Input() maxKarmaPoints: number;
    @Input() status: string;

    constructor() { }

    ngOnInit() { }
}