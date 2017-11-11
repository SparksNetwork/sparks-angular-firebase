import { Component, HostBinding } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { OrganizeUiStateService } from '../organize-ui-state.service'
@Component({
  selector: 'organize-routed-home-overview',
  template: `
<div class='ui sixteen wide column' [ngSwitch]='uiState.setupStatus$ | async'>
  <div *ngSwitchCase='"noJobs"'>
    <i class='icon priority'></i>
    <p>Add the Jobs that you need done and the Opportunities you are offering.</p>
  </div>
  <div *ngSwitchCase='"someJobs"'>
    <i class='icon priority'></i>
    <p>Continue adding Jobs and Opportunties until you are ready to build your Schedule.</p>
  </div>
</div>
<div class='ui eight wide computer eight wide tablet sixteen wide mobile column'>
  <div *ngIf='!(uiState.teamKeys$ | async)'>
    <h1 class='ui header'>What Jobs do you need done?</h1>
  </div>
  <div *ngIf='(uiState.teamKeys$ | async); let teamKeys'>
    <h1 class='ui header'>Jobs</h1>
    <div *ngFor='let teamKey of teamKeys'>
      {{teamKey}}
    </div>
  </div>
</div>
<div class='ui eight wide computer eight wide tablet sixteen wide mobile column'>
  <div *ngIf='!(uiState.oppKeys$ | async)'>
    <h1 class='ui header'>What Opportunities are you offering?</h1>
  </div>
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
  ) {}
}
