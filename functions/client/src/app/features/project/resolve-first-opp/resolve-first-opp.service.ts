import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

@Injectable()
export class ResolveFirstOpp implements Resolve<any> {

  constructor(
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const opps = route.parent.data['opps']
    const opp = opps.map(opps => opps[0])

    return connectedResolver(opp)
  }
}
