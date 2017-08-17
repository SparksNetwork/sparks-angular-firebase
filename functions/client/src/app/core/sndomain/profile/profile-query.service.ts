import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/switchMap'

import { AuthService } from '../../snauth/auth/auth.service'
import { Profile, ProfileCollection } from '../../../../../../universal/domain/profile'

import { obj } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ProfileQueryService extends ProfileCollection {
  public current: Observable<Profile>

  constructor(
    public af: AngularFireDatabase,
    public auth: AuthService,
  ) {
    super(af.database)
    this.current = this.auth.current
      .switchMap(user => {
        if (user && user.uid) {
          return obj(this.one(user.uid))
        } else {
          return Observable.of({})
        }
      })
  }
}
