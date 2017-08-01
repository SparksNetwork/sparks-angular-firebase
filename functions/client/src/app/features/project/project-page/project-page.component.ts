import { Component, OnInit } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import {
  ProjectQueryService,
  ProjectActionService,
} from '../../../core/sndomain/project'


import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

const APIROOT = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'
@Component({
  selector: 'project-project-page',
  templateUrl: 'project-page.component.html'
})

export class ProjectPageComponent implements OnInit {
  public key: string
  public project: FirebaseObjectObservable<any[]>
  public editProject: FormGroup

  constructor(
    public projectAction: ProjectActionService,
    public builder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.key = this.route.snapshot.paramMap.get('key')
    this.project = this.route.snapshot.data['sources']['project']
    this.project.subscribe(p => console.log('project emit', p))
  }

  public ngOnInit() {
    this.editProject = this.builder.group({
      name: '',
      description: '',
    })
  }

  public replace() {
    this.projectAction.replace(this.key, this.editProject.value)
  }

  public update() {
    this.projectAction.update(this.key, this.editProject.value)
  }

  public delete() {
    this.projectAction.delete(this.key)
      .subscribe(data => this.router.navigate(['/project']))
  }
}
