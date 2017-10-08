import * as firebase from 'firebase'
import * as admin from 'firebase-admin'

export interface CollectionPaths {
  api: string
  firebase: string
}

export type Database = firebase.database.Database | admin.database.Database
export type Reference = firebase.database.Reference | admin.database.Reference

export const validateOpt = { validator: { skipMissingProperties: true } };

export class BaseCollection {
  public ref: firebase.database.Reference

  constructor(
    public db: Database,
    public paths: CollectionPaths,
  ) {
    this.ref = db.ref(paths.firebase) as firebase.database.Reference
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

  public compoundKey(firstKey: string, secondKey: string) {
    return firstKey + secondKey
  }
}
