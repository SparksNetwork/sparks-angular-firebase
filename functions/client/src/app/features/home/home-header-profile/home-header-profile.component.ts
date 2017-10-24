import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'home-header-profile',
    templateUrl: 'home-header-profile.component.html',
    styleUrls: ['./home-header-profile.component.scss'],
})

export class HomeHeaderProfileComponent implements OnInit {
  @Input() profile;
    // @Input() prefferedName: string;
    // @Input() message: string;
    // @Input() imageUrl: string;
    // @Input() profileScore: number;
    // @Input() isAuthed: boolean;

    constructor() { }

    ngOnInit() { }
}
