import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { list } from '../../../../../../lib/firebase-angular-observables/list';
import { applicationShiftsTransform } from '../../../../../../universal/domain/applicationShift';

import { ApplicationShiftQueryService } from './application-shift-query.service';
import { SorryService } from '../../sorry/sorry.service';

@Injectable()
export class ResolveApplicationShiftByAppKey implements Resolve<any> {

    constructor(
        private query: ApplicationShiftQueryService,
        private sorry: SorryService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const appKey = route.parent.paramMap.get('applicationKey');

        const applicationShifts = list(this.query.byAppKey(appKey))
            .switchMap(this.sorry.intercept(applicationShiftsTransform))

        return connectedResolver(applicationShifts)
    }
}
