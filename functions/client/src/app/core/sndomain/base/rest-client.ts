import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../../../environments/environment'
import { User } from 'firebase'

export class RestClient {

  constructor(
    public http: Http,
    public ent: string,
    public currentUser$: Observable<User>,
  ) {}

  public url = [environment.apiRoot, this.ent].join('/')

  public authToken$ = this.currentUser$
    .filter(Boolean)
    .switchMap(user => user.getToken())

  public headers$ = this.authToken$
    .map(token => {
      const headers = new Headers()
      headers.append('authorization', `Bearer ${token}`)
      return headers
    })

  public create(value) {
    console.log(this.ent, 'create', value)
    return this.headers$
      .switchMap((headers: Headers) => this.http.post(this.url, value, {headers}))
      .do(data => console.log('create response', data.json()))
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
