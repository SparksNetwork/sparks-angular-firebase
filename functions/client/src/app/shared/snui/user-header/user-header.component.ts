import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'snui-user-header',
    templateUrl: 'user-header.component.html'
})

export class UserHeaderComponent implements OnInit {
    @Input() prefferedName: string;
    @Input() message: string;
    @Input() imageUrl: string;
    @Input() profileScore: number;
    @Input() isAuthed: boolean;

    constructor() { }

    ngOnInit() { }
}