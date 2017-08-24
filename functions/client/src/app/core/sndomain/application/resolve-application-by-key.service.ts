import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from "rxjs/Observable";


import { obj } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationQueryService } from "./application-query.service";
import { Application, applicationTransform } from "../../../../../../universal/domain/application";
import { SorryService } from '../../sorry'

@Injectable()
export class ResolveApplicationByKey implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: ApplicationQueryService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Application | void>> {
    const applicationKey = route.paramMap.get('applicationKey')
    const application = obj(this.query.one(applicationKey))
      .switchMap(this.sorry.intercept(applicationTransform))

    return application
      .map(() => application)
      .first()
  }
}
