import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { list } from '../../../../../../lib/firebase-angular-observables'

import { SorryService } from '../../../core/sorry/sorry.service';
import { AuthService, User } from '../../../core/snauth/auth/auth.service';
import { Opp } from '../../../../../../universal/domain/opp';
import { ApplicationTeamQueryService } from '../../../core/sndomain/applicationTeam/application-team-query.service';
import { ApplicationTeam, applicationTeamsTransform } from '../../../../../../universal/domain/applicationTeam';
import { TeamQueryService } from '../../../core/sndomain/team/team-query.service';

@Injectable()
export class ResolveApplicationTeamsByOpp implements Resolve<any> {

    constructor(
        public sorry: SorryService,
        public query: ApplicationTeamQueryService,
        public teamQuery: TeamQueryService,
        private auth: AuthService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ApplicationTeam[] | void>> {
        const applicationTeams = Observable.combineLatest(this.auth.current, route.parent.data['opp'])
            .switchMap(([user, opp]: [User, Opp]) => {
                const key = this.teamQuery.compoundKey(opp.projectKey, user.uid);
                return list(this.query.byAppKey(key));
            })
            .switchMap(this.sorry.intercept(applicationTeamsTransform));

        return connectedResolver(applicationTeams)
    }
}
