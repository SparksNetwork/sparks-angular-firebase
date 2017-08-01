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
    return this.http.post(APIROOT, value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }
  
  public replace(key: string, value) {
    console.log('replace', value)
    const url = `${APIROOT}/${key}`
    console.log('url', url)
    this.http.put(url, value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }

  public update(key: string, value) {
    console.log('update', value)
    const url = `${APIROOT}/${key}`
    console.log('url', url)
    this.http.patch(url, value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }

  public delete(key: string) {
    console.log('delete', key)
    const url = `${APIROOT}/${key}`
    console.log('url', url)
    const action = this.http.delete(url)
    action
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
    return action
  }
}