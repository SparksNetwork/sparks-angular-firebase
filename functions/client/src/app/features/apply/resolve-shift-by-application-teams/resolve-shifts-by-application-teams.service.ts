import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { list } from '../../../../../../lib/firebase-angular-observables'

import { Shift, shiftsTransform } from '../../../../../../universal/domain/shift';
import { ApplicationTeam } from '../../../../../../universal/domain/applicationTeam';
import { SorryService } from '../../../core/sorry/sorry.service';
import { ShiftQueryService } from '../../../core/sndomain/shift/shift-query.service';

@Injectable()
export class ResolveShiftByApplicationTeams implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: ShiftQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<void | Shift[]>> {

    const combinedShifts = route.parent.data['appTeams'].switchMap((appTeams: ApplicationTeam[]) => {
      const shifts: Array<Observable<void | Shift[]>> = [];

      if (!(appTeams && appTeams.length)) {
        return Observable.of(null);
      }

      appTeams.forEach(appTeam => {
        shifts.push(
          list(this.query.byTeamKey(appTeam.teamKey))
            .switchMap(this.sorry.intercept(shiftsTransform))
        )
      });

      return Observable.combineLatest(shifts).map(shiftArray => {
        let allShifts: Shift[] = [];
        allShifts = allShifts.concat.apply(allShifts, shiftArray);
        return allShifts;
      });
    })

    return connectedResolver(combinedShifts)
  }
}
