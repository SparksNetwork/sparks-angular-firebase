import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { ProjectCollectionService } from '../../../core/sndomain/project-collection.service'

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
    // public af: AngularFireDatabase,
    public http: Http,
    public projectCollection: ProjectCollectionService,
    public builder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.key = this.route.snapshot.paramMap.get('key')
    console.log('key', this.key)
    this.project = projectCollection.one(this.key)
  }

  public ngOnInit() {
    this.editProject = this.builder.group({
      name: '',
      description: '',
    })
  }

  public replace() {
    console.log('replace', this.editProject.value)
    const url = `${APIROOT}/${this.key}`
    console.log('url', url)
    this.http.put(url, this.editProject.value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }

  public update() {
    console.log('update', this.editProject.value)
    const url = `${APIROOT}/${this.key}`
    console.log('url', url)
    this.http.patch(url, this.editProject.value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }

  public delete() {
    console.log('delete', this.editProject.value)
    const url = `${APIROOT}/${this.key}`
    console.log('url', url)
    this.http.delete(url)
      .subscribe(data => {
        console.log('data', data.json())
        this.router.navigate(['/project'])
      }, err => {
        console.log('err', err.json())
      })
  }
}
