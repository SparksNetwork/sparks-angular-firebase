import * as firebase from 'firebase'
import { AngularFireDatabase } from 'angularfire2/database'

import {
  BasePaths,
  BaseCollection,
} from '../shared'

export class BaseQueryService<TCollection extends BaseCollection> {
  public static collectionClass: typeof BaseCollection
  public collection: TCollection

  constructor(
    public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    console.log(this.constructor['collectionClass'])
    console.log(this.paths.firebase)
    this.collection = new this.constructor['collectionClass'](this.af.database.ref(paths.firebase))
  }

  // public one(key: string) {
  //   return this.af.object(this.collection.one(key))
  // }

  // public all() {
  //   return this.af.list(this.collection.all())
  // }
}
