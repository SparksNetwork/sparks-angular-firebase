import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';

import { BaseActionService } from '../../../../../../lib/firebase-universal/client/base-action.service';
import { ApplicationShiftQueryService } from './application-shift-query.service';
import { ApplicationShift } from '../../../../../../universal/domain/applicationShift';

@Injectable()
export class ApplicationShiftActionService extends BaseActionService {
    constructor(
        public query: ApplicationShiftQueryService,
        public http: Http
    ) {
        super(environment.apiRoot, query.paths.api, http)
    }

    public createApplicationShift(applicationKey: string, shiftKey: string): Observable<Response> {
        const applicationShift = new ApplicationShift();
        applicationShift.appKey = applicationKey;
        applicationShift.shiftKey = shiftKey;
        applicationShift.joinedOn = new Date().toISOString();

        return this.create(applicationShift);
    }
}
