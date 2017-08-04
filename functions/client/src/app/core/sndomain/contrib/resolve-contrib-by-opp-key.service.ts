import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import { Observable } from "rxjs/Observable";
import { transformAndValidate } from 'class-transformer-validator';

import { ContribQueryService } from './contrib-query.service'
import { Contribution } from "../../../../../../shared/models/contribution.model";

@Injectable()
export class ResolveContribByOppKey implements Resolve<Observable<Contribution[]>> {

  constructor(
    public contribQuery: ContribQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const oppKey = route.paramMap.get('oppKey')
    const contribs = this.contribQuery.af.list('/contrib', {
      query: {
        orderByChild: 'oppKey',
        equalTo: oppKey,
      },
    });

    const validateOpt = { validator: { skipMissingProperties: true } };

    return contribs
      .map((c: any[]) => Observable.fromPromise(transformAndValidate(Contribution, c, validateOpt).then((c: Contribution[]) => {
        return c;
      })
        .catch(error => {
          // TODO handle error on transformation (invalid JSON) or validation error
          console.log(error);
        })
      ))
      .first();
  }
}