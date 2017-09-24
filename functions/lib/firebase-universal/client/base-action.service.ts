import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { CollectionPaths } from '../shared'
export class BaseActionService {
  public url: string
  constructor(
    public apiRoot: string,
    public apiPath: string,
    public http: Http,
  ) {
    this.url = apiRoot + apiPath
  }

  public create(value) {
    console.log(this.apiPath, 'create', value)
    return this.http.post(this.url, value)
      .do(data => console.log('create response', data.json()))
  }

  public replace(key: string, value) {
    console.log(this.apiPath, 'replace', key, value)
    const url = `${this.url}/${key}`
    return this.http.put(url, value)
      .do(data => console.log('replace response', data.json()))
  }

  public update(key: string, value) {
    console.log(this.apiPath, 'update', key, value)
    const url = `${this.url}/${key}`
    // post instead of patch because firebase-functions http handlers
    // do not populate req.body when PATCH verb used
    // return this.http.patch(url, value)
    return this.http.post(url, value)
      .do(data => console.log('update response', data.json()))
  }

  public delete(key: string) {
    console.log(this.apiPath, 'delete', key)
    const url = `${this.url}/${key}`
    return this.http.delete(url)
      .do(data => console.log('delete response', data.json()))
  }

  public formatToDb(val) {
    delete val.$key;
    return val;
  }
}
