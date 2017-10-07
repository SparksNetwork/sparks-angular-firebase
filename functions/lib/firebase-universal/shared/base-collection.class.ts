import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'
import * as admin from 'firebase-admin'

export interface CollectionPaths {
  api: string
  firebase: string
}

// export interface IDatabase {
//   ref: (path?: string) => IReference | firebase.database.Reference
// }

// export type Database = firebase.database.Database // | IDatabase
export type Database = firebase.database.Database | admin.database.Database

// export interface IReference extends IQuery {
//   key: string
//   child: (path: string) => IReference
//   push: (any) => Promise<any>
//   set: (any) => Promise<any>
//   update: (any) => Promise<any>
//   remove: () => Promise<any>
// }

// export type Reference = firebase.database.Reference // | IReference
export type Reference = firebase.database.Reference | admin.database.Reference

// export interface IQuery {
//   orderByChild: (key: string) => IQuery
//   equalTo: (value: string) => IQuery
//   endAt: (value: string | number | boolean, key?: string) => IQuery | firebase.database.Query
//   // on: (value: string) => Promise<any>
//   once: (
//     value: string,
//     // successCallback?: (a: Reference, b?: string) => any,
//     successCallback?: (a: any, b?: string) => any,
//     failureCallback?: Object,
//     context?: Object) => Promise<any>
// }

// export type RefOrQuery = IReference | IQuery

export const validateOpt = { validator: { skipMissingProperties: true } };

export class BaseCollection {
  // public ref: Reference
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
