import { Component, Input, OnInit, HostBinding } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'

import { EntState, ItemState } from '../../core/snents/ngrx-ents'

@Component({
  selector: 'explore-card-project',
  styleUrls: ['./card-project.component.scss'],
  template: `
<div class='image' [style.backgroundImage]='"url(" + (imageUrl$ | async) + ")"'>
</div>
<div class='content'>
  <div class='header'>{{title$ | async}}</div>
</div>
<div class='extra content'>
  <a [routerLink]="['/organize', key]">organize</a>
</div>
`
})
export class CardProjectComponent implements OnInit {
  @HostBinding('class') klass = 'card'

  @Input() key: string
  public project$: Observable<ItemState<Project>>
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
    this.imageUrl$ = values$.map(v => v.images[0].imageUrl)
    this.title$ = values$.pluck('title')
  }
}
