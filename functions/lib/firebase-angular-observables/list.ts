import { DataSnapshot, Reference, Query } from 'firebase/database'
import { Observable } from 'rxjs'

const log = (src:string) => () => console.log('event:', src)

export type RefOrQuery = Reference | Query

function arrayFromValueSnap(snap) {
  const vals = snap.val() || {}
  return Object.keys(vals).map($key => ({$key, ...vals[$key]}))
}

function arrayFromChangedSnap(snap, arr) {
  const val = snap.val()
  const $key = snap.key
  return arr.map(row => (row.$key === $key) ? ({$key, ...val}) : row)
}

function arrayFromAddedSnap(snap, arr) {
  const val = snap.val()
  const $key = snap.key
  return [...arr, {$key, ...val}]
}

function arrayFromRemovedSnap(snap, arr) {
  const $key = snap.key
  return arr.filter(row => row.$key !== $key)
}

export function list(src: RefOrQuery): Observable<any[]> {
  let arr = []
  let firstValueReceived = false

  const onValue$ =
    Observable.fromPromise<DataSnapshot>(src.once('value'))
      .do(log('value'))
      .map(snap => arrayFromValueSnap(snap))
      .do(() => firstValueReceived = true)

  const onChildChanged$ =
    Observable.fromEvent<DataSnapshot>(src, 'child_changed')
      .filter(() => firstValueReceived)
      .do(log('child_changed'))
      .map(snap => arrayFromChangedSnap(snap, arr))

  const onChildAdded$ =
    Observable.fromEvent<DataSnapshot>(src, 'child_added')
      .filter(() => firstValueReceived)
      .do(log('child_added'))
      .map(snap => arrayFromAddedSnap(snap, arr))

  const onChildRemoved$ =
    Observable.fromEvent<DataSnapshot>(src, 'child_removed')
      .filter(() => firstValueReceived)
      .do(log('child_removed'))
      .map(snap => arrayFromRemovedSnap(snap, arr))

  const changes$ =
    Observable.merge(
      onValue$,
      onChildChanged$,
      onChildAdded$,
      onChildRemoved$,
    )
    .do(newArr => arr = newArr)
    .publishReplay(1)

  changes$.connect()

  return changes$
}