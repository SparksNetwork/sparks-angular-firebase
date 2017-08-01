import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { FormGroup, FormBuilder } from '@angular/forms'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

const APIROOT = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'
@Component({
  selector: 'project-project-list-page',
  templateUrl: 'project-list-page.component.html'
})

export class ProjectListPageComponent implements OnInit {
  public projects: FirebaseListObservable<any[]>
  public newProject: FormGroup

  constructor(
    public af: AngularFireDatabase,
    public http: Http,
    public builder: FormBuilder,
  ) {
    this.projects = af.list('/project')
  }

  public ngOnInit() {
    this.newProject = this.builder.group({
      name: '',
      description: '',
    })
  }

  public create() {
    console.log('create', this.newProject.value)
    this.http.post(APIROOT, this.newProject.value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }
}
