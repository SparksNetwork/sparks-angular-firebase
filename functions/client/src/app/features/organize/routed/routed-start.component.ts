import { Component, HostBinding } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subject } from 'rxjs/Subject'
import { OrganizeUiStateService } from '../organize-ui-state.service'
import { Store } from '@ngrx/store'
import { ProjectActions } from '../../../core/snents/project/project.actions'

@Component({
  selector: 'organize-routed-start',
  template: `
<snui-header-full>
  <h1 class='ui header inverted' style='font-size: 2em'>
  Start Organizing People
  </h1>
</snui-header-full>
<div class='ui grid container'>
  <div class='sixteen wide tablet sixteen wide mobile eight wide computer column'>
    <div class='ui form'>
      <div class='field'>
        <label>Give your project a name that tells people what they're getting involved in.</label>
        <input type='text' placeholder='Project Name' (keyup)='title$.next($event.target.value)'>
      </div>
      <div class='grouped fields'>
        <label>Who benefits from this project?</label>
        <div class='field'>
          <div class='ui radio checkbox'>
            <input type='radio' name='beneficiary' value='volunteer' (change)='beneficiary$.next($event.target.value)'>
            <label>
              This <b>Volunteer</b> project doesn't provide financial benefits
              to me or another for-profit entity.
            </label>
          </div>
        </div>
        <div class='field'>
          <div class='ui radio checkbox'>
            <input type='radio' name='beneficiary' value='workExchange' (change)='beneficiary$.next($event.target.value)'>
            <label>
              It's a <b>Work Exchange</b> project that provides financial benefit
              to me or another for-profit entity.
            </label>
          </div>
        </div>
      </div>
      <button class='ui minor button' [routerLink]='["/"]'>cancel</button>
      <button class='ui minor button' [disabled]='!(valid$ | async)' (click)='ok$.next()'>ok</button>
    </div>
  </div>
</div>
`
})
export class RoutedStartComponent {
  public title$ = new BehaviorSubject(null)
  public beneficiary$ = new BehaviorSubject(null)
  public values$: Observable<{title, beneficiary}>
  public valid$: Observable<boolean>
  public ok$ = new Subject<boolean>()
  public submitted$: Observable<{title, beneficiary}>

  constructor(
    public uiState: OrganizeUiStateService,
    public store: Store<any>,
  ) {
    this.values$ = Observable.combineLatest(
      this.title$,
      this.beneficiary$,
      (title, beneficiary) => ({title, beneficiary})
    )

    this.valid$ = this.values$
      .map(({title, beneficiary}) => title && beneficiary)
      .map(Boolean)

    this.submitted$ = this.values$.sample(this.ok$)

    this.submitted$.subscribe(values => this.store.dispatch(new ProjectActions.Create(values)))

    this.values$.subscribe(v => console.log('values', v))
    this.valid$.subscribe(v => console.log('valid', v))
    this.submitted$.subscribe(v => console.log('submitted', v))
  }
}
