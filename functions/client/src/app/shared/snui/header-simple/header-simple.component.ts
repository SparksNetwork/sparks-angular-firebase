import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'snui-header-simple',
  templateUrl: './header-simple.component.html',
  // styleUrls: ['./header-simple.component.css']
})
export class HeaderSimpleComponent implements OnInit {
  @Input() imageUrl: string

  constructor() { }

  ngOnInit() {
  }

}
