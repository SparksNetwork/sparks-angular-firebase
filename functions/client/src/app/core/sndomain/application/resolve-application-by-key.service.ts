import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from "rxjs/Observable";


import { obj } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationQueryService } from "./application-query.service";
import { Application } from "../../../../../../universal/domain/application";

@Injectable()
export class ResolveApplicationByKey implements Resolve<any> {

  constructor(
    public query: ApplicationQueryService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Application[]>> {
    ///const appKey = route.paramMap.get('appKey')
    const appKey = 'AP1';
    const app = obj(this.query.one(appKey))

    return app
      .map(() => app)
      .first()
  }
}
