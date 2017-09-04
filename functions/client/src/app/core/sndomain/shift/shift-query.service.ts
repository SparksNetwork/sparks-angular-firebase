import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

import { ShiftCollection } from "../../../../../../universal/domain/shift";

@Injectable()
export class ShiftQueryService extends ShiftCollection {
    constructor(
        public af: AngularFireDatabase
    ) {
        super(af.database)
    }
}