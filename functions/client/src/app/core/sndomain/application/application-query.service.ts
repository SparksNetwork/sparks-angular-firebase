import { EventEmitter, Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

import { ApplicationCollection, applicationsTransform } from "../../../../../../universal/domain/application";
import { SorryService } from "../../sorry/sorry.service";
import { list } from "../../../../../../lib/firebase-angular-observables/list";

@Injectable()
export class ApplicationQueryService extends ApplicationCollection {
  constructor(
    public af: AngularFireDatabase,
    public sorry: SorryService,
  ) {
    super(af.database)
  }

  public byProfileKey(profileKey: string) {
    return list(this.by('profileKey', profileKey))
      .switchMap(this.sorry.intercept(applicationsTransform));
  }
}