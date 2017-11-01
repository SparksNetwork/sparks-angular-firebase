import { Component, HostBinding } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { OrganizeUiStateService } from './organize-ui-state.service'
@Component({
  selector: 'organize-routed-home-overview',
  template: `
<div class='ui eight wide computer eight wide tablet sixteen wide mobile column'>
  <div>
    <h1 class='ui header'>Jobs</h1>
  </div>
</div>
<div class='ui eight wide computer eight wide tablet sixteen wide mobile column'>
  <div *ngIf='(uiState.oppKeys$ | async); let oppKeys'>
    <h1 class='ui header'>Opportunities</h1>
    <div *ngFor='let oppKey of oppKeys'>
      {{oppKey}}
    </div>
  </div>
</div>

`
})
export class RoutedHomeOverviewComponent {
  @HostBinding('class') klass = 'ui grid'
  // public title$: Observable<string>

  constructor(
    public uiState: OrganizeUiStateService,
  ) {
  }
}
