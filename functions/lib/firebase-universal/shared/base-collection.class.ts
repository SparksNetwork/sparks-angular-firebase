import { AngularFireDatabase } from 'angularfire2/database'
import { BasePaths } from './base-paths.class'
import * as firebase from 'firebase'

export class BaseCollection {
  constructor(
    public ref: any
  ) {
  }

  public one(key: string) {
    return this.ref.child(key)
  }

  public all() {
    return this.ref
  }

  public by(orderByChild: string, equalTo: string) {
    return this.ref.orderByChild(orderByChild).equalTo(equalTo)
  }
}