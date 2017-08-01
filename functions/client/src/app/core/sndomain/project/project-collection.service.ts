import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'

@Injectable()
export class ProjectCollectionService {
  public ref: firebase.database.Reference

  constructor(
    public af: AngularFireDatabase,
  ) {
    this.ref = this.af.database.ref('/project')
  }
  
  public one(key: string) {
    return this.af.object(this.ref.child(key))
  }

  public all() {
    return this.af.list(this.ref)
  }
}