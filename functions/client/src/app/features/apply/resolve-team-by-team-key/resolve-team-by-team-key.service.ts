import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import { Team } from '../../../../../../universal/domain/team';
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

@Injectable()
export class ResolveTeamByTeamKey implements Resolve<any> {

  constructor(
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const teams = route.parent.data['teams'];
    const teamKey = route.paramMap.get('teamKey');
    const team = teams.map(t => t.find(s => s.$key === teamKey));

    return connectedResolver(team)
  }
}
