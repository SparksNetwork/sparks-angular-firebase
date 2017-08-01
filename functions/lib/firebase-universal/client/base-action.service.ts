import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { BasePaths } from './base-paths.service'

export class BaseActionService {
  public url: string

  constructor(
    public paths: BasePaths,
    public http: Http,
  ) {
    this.url = this.paths.api
  }

  public create(value) {
    console.log('create', value)
    return this.http.post(this.url, value)
      .subscribe(data => {
        console.log('data', data.json())
      }, err => {
        console.log('err', err.json())
      })
  }
  
  public replace(key: string, value) {
    console.log('replace', value)
    const url = `${this.url}/${key}`
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
    const url = `${this.url}/${key}`
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
    const url = `${this.url}/${key}`
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