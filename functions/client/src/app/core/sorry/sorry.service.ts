import { Injectable, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class SorryService {
  public isSorry: EventEmitter<boolean>

  constructor() {
    this.isSorry = new EventEmitter()
  }

  public intercept<T>(transformer: (src: any) => Promise<T>) {
    return (obj: any): Promise<T | void> => {
      return transformer(obj).catch(err => {
        // TODO: eventually we will hook this to bugsnag
        console.log('Sorry! Error:', JSON.stringify(err, null, 2))
        this.isSorry.emit(true)
      })
    }
  }
}
