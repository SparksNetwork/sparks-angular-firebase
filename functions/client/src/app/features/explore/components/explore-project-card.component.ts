import { Component, Input, OnInit, HostBinding } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectItem, ProjectService } from '../../../core/sndomain/project'

@Component({
  selector: 'explore-project-card',
  // styleUrls: ['./card-project.component.scss'],
  template: `
<div class='image' [style.backgroundImage]='"url(" + (imageUrl$ | async) + ")"'>
</div>
<div class='content'>
  <div class='header'>{{title$ | async}}</div>
  <div class='secondary'>label</div>
</div>
`
})
export class ExploreProjectCardComponent implements OnInit {
  @HostBinding('class') klass = 'ui card'

  @Input() key: string
  public project$: Observable<ProjectItem>
  public imageUrl$: Observable<string>
  public title$: Observable<string>

  constructor(
    public projects: ProjectService,
  ) {
  }

  ngOnInit() {
    this.project$ = this.projects.one(this.key)

    const values$: Observable<any> = this.project$
      .pluck('values')
      .filter(Boolean)
    this.imageUrl$ = values$.map(v => v.images ? v.images[0].imageUrl : '')
    this.title$ = values$.pluck('title')
  }
}
