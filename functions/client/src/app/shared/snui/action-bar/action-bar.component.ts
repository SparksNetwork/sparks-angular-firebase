import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'snui-action-bar',
  templateUrl: './action-bar.component.html',
})
export class ActionBarComponent implements OnInit {
  @Input() type: ActionBarType;
  @Input() projectTitle: string;
  askLabel: string;

  constructor() { }

  ngOnInit() {
    this.askLabel = this.type === ActionBarType.Organizer ? this.projectTitle + " Organizers" : "Sparks";
  }

}

export enum ActionBarType {
  Sparks,
  Organizer
}
