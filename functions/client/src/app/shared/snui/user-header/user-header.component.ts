import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'user-header',
    templateUrl: 'user-header.component.html'
})

export class UserHeaderComponent implements OnInit {
    @Input() prefferedName: string = 'Guest';
    @Input() message: string = 'You need first register before you can level up';
    @Input() imageUrl: string = 'https://placeimg.com/85/85/people/grayscale';
    @Input() profileScore: number;

    constructor() { }

    ngOnInit() { }
}