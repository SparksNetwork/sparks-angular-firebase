import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

const APIROOT = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'

@Injectable()
export class ProjectActionService {

  constructor(
    public http: Http,
  ) {
  }

  public create(value) {
    console.log('create', value)
    this.http.post(APIROOT, value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }
}