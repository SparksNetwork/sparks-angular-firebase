import { EventEmitter, Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { ApplicationCollection } from "../../../../../../universal/domain/application";

@Injectable()
export class ApplicationQueryService extends ApplicationCollection {
    constructor(
        public af: AngularFireDatabase
      ) {
        super(af.database)
      }
}