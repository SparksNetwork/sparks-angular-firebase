import { DataSnapshot, Reference, Query } from 'firebase/database'
import { Observable } from 'rxjs'

// const log = (src:string) => () => console.log('event:', src)

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

export function obj(src: Reference): Observable<any> {
  let arr = []

  const onValue$ =
    Observable.fromEvent<DataSnapshot>(src, 'value')
      // .do(log('value'))
      .map(snap => ({$key: snap.key, ...snap.val()}))

  const changes$ =
    onValue$
    .publishReplay(1)

  changes$.connect()

  return changes$
  // return onValue$
}
