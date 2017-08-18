import { EventEmitter, Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { ApplicationTeamCollection } from "../../../../../../universal/domain/applicationTeam";

@Injectable()
export class ApplicationTeamQueryService extends ApplicationTeamCollection {
    constructor(
        public af: AngularFireDatabase
      ) {
        super(af.database)
      }
}