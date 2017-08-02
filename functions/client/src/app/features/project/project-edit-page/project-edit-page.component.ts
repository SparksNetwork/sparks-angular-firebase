import { Component, OnInit } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { ProjectActionService } from '../../../core/sndomain/project'


import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-project-edit-page',
  templateUrl: 'project-edit-page.component.html'
})

export class ProjectEditPageComponent implements OnInit {
  public key: string
  public project: FirebaseObjectObservable<IProject>
  public editProject: FormGroup

  constructor(
    public projectAction: ProjectActionService,
    public builder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.key = this.route.snapshot.paramMap.get('key')
    this.project = this.route.snapshot.data['sources']['project']
  }

  public ngOnInit() {
    this.editProject = this.builder.group({
      title: '',
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
