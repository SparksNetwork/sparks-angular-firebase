import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ApplicationShiftCollection } from '../../../../../../universal/domain/applicationShift';

@Injectable()
export class ApplicationShiftQueryService extends ApplicationShiftCollection {
    constructor(
        public af: AngularFireDatabase
    ) {
        super(af.database)
    }
}
