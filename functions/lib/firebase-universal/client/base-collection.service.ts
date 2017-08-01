import { AngularFireDatabase } from 'angularfire2/database'
import { BasePaths } from './base-paths.service'
import * as firebase from 'firebase'

export class BaseCollectionService {
  public ref: firebase.database.Reference

  constructor(
    public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    this.ref = this.af.database.ref(paths.firebase)
  }

  public one(key: string) {
    return this.af.object(this.ref.child(key))
  }

  public all() {
    return this.af.list(this.ref)
  }
}