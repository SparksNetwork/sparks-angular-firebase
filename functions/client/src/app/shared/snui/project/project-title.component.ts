import { Component, Input } from '@angular/core'

@Component({
  selector: 'snui-project-title',
  template: `
  <div class="segment" [ngClass]="{'small-title':title?.length <= 15}">
  <h1 class="project-title">{{title}}</h1>
  <div class="project-karma">
    <div class="project-karma-count">{{maxKarmaPoints}}
      <span class="ic ic-karma-points"></span>
    </div>
    <div class="karma-text">karma points</div>
  </div>
`
})
export class ProjectTitleComponent {

  @Input() title: string;
  @Input() maxKarmaPoints: number;

  constructor() { }

}
