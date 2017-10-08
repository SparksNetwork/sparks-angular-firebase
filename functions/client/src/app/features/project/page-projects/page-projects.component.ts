import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { FormGroup, FormBuilder } from '@angular/forms'

import {
  ProjectActionService,
} from '../../../core/sndomain/project'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'project-page-projects',
  templateUrl: 'page-projects.component.html'
})

export class PageProjectsComponent implements OnInit {
  public projects: Observable<any[]>
  public newProject: FormGroup

  constructor(
    // public projectQuery: ProjectQueryService,
    public projectAction: ProjectActionService,
    public builder: FormBuilder,
    public route: ActivatedRoute,
  ) {
    this.projects = this.route.snapshot.data['projects']
  }

  public ngOnInit() {
    this.newProject = this.builder.group({
      title: '',
      description: '',
    })
  }

  public create() {
    this.projectAction.create(this.newProject.value)
  }
}
