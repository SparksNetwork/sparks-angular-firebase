import { Component, OnInit } from '@angular/core'
import { FirebaseListObservable } from 'angularfire2/database'
import { FormGroup, FormBuilder } from '@angular/forms'

import {
  ProjectCollectionService,
  ProjectActionService,
} from '../../../core/sndomain/project'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'project-project-list-page',
  templateUrl: 'project-list-page.component.html'
})

export class ProjectListPageComponent implements OnInit {
  public projects: FirebaseListObservable<any[]>
  public newProject: FormGroup

  constructor(
    public projectCollection: ProjectCollectionService,
    public projectAction: ProjectActionService,
    public builder: FormBuilder,
  ) {
    this.projects = projectCollection.all()
  }

  public ngOnInit() {
    this.newProject = this.builder.group({
      name: '',
      description: '',
    })
  }

  public create() {
    this.projectAction.create(this.newProject.value)
  }
}
