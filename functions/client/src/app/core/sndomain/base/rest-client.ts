import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../../../environments/environment'
import { User } from 'firebase'

export class RestClient {
  public url: string

  constructor(
    public http: Http,
    public ent: string,
    public currentUser$: Observable<User>,
  ) {
    this.url = [environment.apiRoot, ent].join('/')
  }

  public getAuthHeader(token: string) {
    const headers = new Headers()
    headers.append('authorization', `Bearer ${token}`)
    console.log('headers', headers)
    return headers
  }

  public create(value) {
    console.log(this.ent, 'create', value)
    // return this.http.post(this.url, value)
    //   .do(data => console.log('create response', data.json()))

    return this.currentUser$
      .filter(Boolean)
      .switchMap(user => user.getToken())
      .do(v => console.log('user token', v))
      .switchMap((token: string) => this.http.post(this.url, value, {headers: this.getAuthHeader(token)}))
  }

  public replace(key: string, value) {
    console.log(this.ent, 'replace', key, value)
    const url = `${this.url}/${key}`
    return this.http.put(url, value)
      .do(data => console.log('replace response', data.json()))
  }

  public update(key: string, value) {
    console.log(this.ent, 'update', key, value)
    const url = `${this.url}/${key}`
    // post instead of patch because firebase-functions http handlers
    // do not populate req.body when PATCH verb used
    // return this.http.patch(url, value)
    return this.http.post(url, value)
      .do(data => console.log('update response', data.json()))
  }

  public delete(key: string) {
    console.log(this.ent, 'delete', key)
    const url = `${this.url}/${key}`
    return this.http.delete(url)
      .do(data => console.log('delete response', data.json()))
  }

}
