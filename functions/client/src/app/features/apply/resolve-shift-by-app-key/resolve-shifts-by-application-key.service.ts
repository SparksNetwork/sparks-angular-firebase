import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'

import { list } from '../../../../../../lib/firebase-angular-observables'

import { Shift, shiftsTransform } from "../../../../../../universal/domain/shift";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";
import { SorryService } from "../../../core/sorry/sorry.service";
import { ShiftQueryService } from "../../../core/sndomain/shift/shift-query.service";

@Injectable()
export class ResolveShiftByApplicationKey implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: ShiftQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<(void | Shift[])[]>> {

    const combinedShifts = route.parent.data["appTeams"].switchMap((appTeams: ApplicationTeam[]) => {
      let shifts: Array<Observable<void | Shift[]>> = [];

      if (!appTeams) return Observable.of(null);

      appTeams.forEach(appTeam => {
        shifts.push(
          list(this.query.byTeamKey(appTeam.teamKey))
            .switchMap(this.sorry.intercept(shiftsTransform))
        )
      });

      return Observable.combineLatest(shifts);
    })

    return combinedShifts
      .map(() => combinedShifts)
      .first()
  }
}
