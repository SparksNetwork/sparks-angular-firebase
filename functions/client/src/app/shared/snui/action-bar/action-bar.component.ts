import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'snui-action-bar',
  templateUrl: './action-bar.component.html',
})
export class ActionBarComponent implements OnInit {
  @Input() type: ActionBarType;
  askLabel: string;

  constructor() { }

  ngOnInit() {
    this.askLabel = this.type === ActionBarType.Organizer ? "The Organizer" : "Sparks";
  }

}

export enum ActionBarType {
  Sparks,
  Organizer
}
