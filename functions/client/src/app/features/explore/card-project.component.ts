import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'

import { EntState, ItemState } from '../../core/snents/ngrx-ents'

@Component({
  selector: 'explore-card-project',
  template: `
<div class='image'>
  <img [src]='imageUrl$ | async' style='height: 240px;'/>
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
  @Input() key: string
  public project$: Observable<ItemState<Project>>
  public imageUrl$: Observable<string>
  public title$: Observable<string>
  // public projectsRecruiting$: Observable<IdxState>
  // public keys$: Observable<string[]>
  // public values$: Observable<Project>
  public loaded$: Observable<boolean>

  constructor(
    // public route: ActivatedRoute,
    public projects: ProjectService,
  ) {
  }

  ngOnInit() {
    this.project$ = this.projects.one(this.key)

    const values$: Observable<any> = this.project$.pluck('values')
    this.imageUrl$ = values$.map(v => v.images[0].imageUrl)
    this.title$ = values$.pluck('title')
    // this.projectsRecruiting$ = this.projects.by('isRecruiting', 'true')

    // this.keys$ = this.projectsRecruiting$.pluck('keys')

    this.loaded$ = this.project$.pluck('loaded')
  }
}
