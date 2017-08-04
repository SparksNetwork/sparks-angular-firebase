import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import { transformAndValidate } from 'class-transformer-validator';

import { OppQueryService } from './opp-query.service'
import { Opportunity } from "../../../../../../shared/models/opportunity.model";

@Injectable()
export class ResolveOppByProjectKey implements Resolve<Promise<Opportunity[]>> {

  constructor(
    public oppQuery: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projectKey = route.paramMap.get('projectKey');
    const opps = this.oppQuery.af.list('/opp', {
      query: {
        orderByChild: 'projectKey',
        equalTo: projectKey,
      },
    });

    const validateOpt = {validator: {skipMissingProperties: true}};

    return opps
      .map((o: any[]) => transformAndValidate(Opportunity, o, validateOpt).then((o: Opportunity[]) => {
          return o;
        })  
        .catch(error => {
          // TODO handle error on transformation (invalid JSON) or validation error
          console.log(error);
        })
      )
      .first();
  }
}