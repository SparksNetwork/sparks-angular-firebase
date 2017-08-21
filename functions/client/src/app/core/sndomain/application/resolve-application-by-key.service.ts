import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from "rxjs/Observable";


import { obj } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationQueryService } from "./application-query.service";
import { ApplicationDataService } from "./application-data.service";
import { Application } from "../../../../../../universal/domain/application";

@Injectable()
export class ResolveApplicationByKey implements Resolve<any> {

  constructor(
    public query: ApplicationQueryService,
    public applicationDataService: ApplicationDataService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Application[]>> {
    const applicationKey = this.applicationDataService.$key;
    const application = obj(this.query.one(applicationKey))

    return application
      .map(() => application)
      .first()
  }
}
