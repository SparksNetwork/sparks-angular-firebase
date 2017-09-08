import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../../../environments/environment';

import { BaseActionService } from '../../../../../../lib/firebase-universal/client/base-action.service';
import { ApplicationShiftQueryService } from './application-shift-query.service';

@Injectable()
export class ApplicationShiftActionService extends BaseActionService {
    constructor(
        public query: ApplicationShiftQueryService,
        public http: Http
    ) {
        super(environment.apiRoot, query.paths.api, http)
    }
}
