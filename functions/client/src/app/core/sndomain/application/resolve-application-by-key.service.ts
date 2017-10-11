import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import { Observable } from 'rxjs/Observable'

import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { ApplicationQueryService } from './application-query.service'
import { Application, applicationTransform } from '../../../../../../universal/domain/application'
import { SorryService } from '../../sorry'
import { AngularFireDatabase } from 'angularfire2/database'

@Injectable()
export class ResolveApplicationByKey implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: ApplicationQueryService,
    public afdb: AngularFireDatabase
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Application | void>> {
    const applicationKey = route.paramMap.get('applicationKey')
    const application = this.afdb.object(this.query.one(applicationKey)).snapshotChanges()
      .map(action => ({$key: action.payload.key, ...action.payload.val()}))
      .switchMap(this.sorry.intercept(applicationTransform))

    return connectedResolver(application)
  }
}
