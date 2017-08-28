import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'
import 'reflect-metadata';

export interface CollectionPaths {
  api: string
  firebase: string
}

export interface IDatabase {
  ref: (path?: string) => IReference | firebase.database.Reference
}

export type Database = firebase.database.Database | IDatabase

export interface IReference extends IQuery {
  key: string
  child: (path: string) => IReference
  push: (any) => firebase.Thenable<any>
  set: (any) => firebase.Thenable<any>
  update: (any) => firebase.Thenable<any>
  remove: () => firebase.Thenable<any>
}

export type Reference = firebase.database.Reference | IReference

export interface IQuery {
  orderByChild: (key: string) => IQuery
  equalTo: (value: string) => IQuery
  endAt: (value: string | number | boolean, key?: string) => IQuery | firebase.database.Query
}

export type RefOrQuery = IReference | IQuery

export class BaseCollection {
  public ref: Reference

  constructor(
    public db: Database,
    public paths: CollectionPaths,
  ) {
    this.ref = db.ref(paths.firebase)
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
