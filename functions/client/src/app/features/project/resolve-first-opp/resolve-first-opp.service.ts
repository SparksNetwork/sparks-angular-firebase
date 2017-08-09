import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

@Injectable()
export class ResolveFirstOpp implements Resolve<any> {

  constructor(
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const opps = route.parent.data['opps']
    const opp = opps.map(opps => opps[0])
    // const teams = firstOpp
    //   .mergeMap(opp => this.contribQuery.af.list('/team', {
    //     query: {
    //       orderByChild: 'oppKey',
    //       equalTo: opp.$key,
    //     }
    //   }))
    //   .do(teams => console.log('teams found', teams))

    return opp
      .map(() => opp)
      .first()
  }
}