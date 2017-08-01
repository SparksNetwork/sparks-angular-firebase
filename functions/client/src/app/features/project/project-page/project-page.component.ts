import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database'
import { FormGroup, FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

const APIROOT = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'
@Component({
  selector: 'project-project-page',
  templateUrl: 'project-page.component.html'
})

export class ProjectPageComponent {
  public key: string
  public project: FirebaseObjectObservable<any[]>
  public editProject: FormGroup

  constructor(
    public af: AngularFireDatabase,
    public http: Http,
    public builder: FormBuilder,
    public route: ActivatedRoute,
  ) {
    this.key = this.route.snapshot.paramMap.get('key')
    this.project = af.object(`/project/${this.key}`)
  }

  public replace() {
    console.log('replace', this.editProject.value)
    this.http.post(`${APIROOT}/${this.key}`, this.editProject.value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }

  public update() {

  }

  public delete() {

  }
}
