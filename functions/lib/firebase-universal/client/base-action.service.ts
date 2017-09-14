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
    console.log('create', value)
    return this.http.post(this.url, value)
    // .subscribe(data => {
    //   console.log('data', data.json())
    // }, err => {
    //   console.log('err', err.json())
    // })
  }

  public replace(key: string, value) {
    console.log('replace', value)
    const url = `${this.url}/${key}`
    console.log('url', url)
    return this.http.put(url, value)
    // .subscribe(data => {
    //   console.log('data', data.json())
    // }, err => {
    //   console.log('err', err.json())
    // })
  }

  public update(key: string, value) {
    console.log('update', value)
    const url = `${this.url}/${key}`
    console.log('url', url)
    // post instead of patch because firebase-functions http handlers
    // do not populate req.body when PATCH verb used
    // return this.http.patch(url, value)
    return this.http.patch(url, value)
    // .subscribe(data => {
    //   console.log('data', data.json())
    // }, err => {
    //   console.log('err', err.json())
    // })
  }

  public delete(key: string) {
    console.log('delete', key)
    const url = `${this.url}/${key}`
    console.log('url', url)
    return this.http.delete(url)
    //   .subscribe(data => {
    //     console.log('data', data.json())
    //   }, err => {
    //     console.log('err', err.json())
    //   })
    // return action
  }

  public formatToDb(val) {
    delete val.$key;
    return val;
  }
}
