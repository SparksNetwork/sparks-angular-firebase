import { Observable } from 'rxjs'

export function connectedResolver(o$: Observable<any>) {
  const published$ = o$.publishReplay(1)
  published$.connect()
  return published$
    .map(() => published$)
    .take(1)
}
