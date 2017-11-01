import { Component, HostBinding, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'
import { Store } from '@ngrx/store'

import { EntState, IdxState } from '../../core/snents/ngrx-ents'

import { OrganizeUiStateService } from './organize-ui-state.service'

// <div class='sn-gradient'></div>

@Component({
  selector: 'organize-header-home',
  styleUrls: ['./header-home.component.scss'],
  template: `
<div class='header-image' [style.backgroundImage]='"url(" + imageUrl + ")"'>
  <div class='content' style='display: flex; flex-direction: column; justify-content: space-between;'>

    <div class='ui labeled icon fluid five item secondary borderless inverted menu'>
      <ng-container>
      <a *ngFor='let context of uiState.contexts'
        class='item'
        [routerLink]='uiState.segmentsForContext$(context.routeSegment) | async'
        [class.active]='uiState.contextLinkActive(context.routeSegment) | async'
        >
        <i [class]='context.iconClasses'></i>
        {{context.label}}
      </a>
      </ng-container>
    </div>

  <div style='display: flex'>
    <div class='small-hide large-hide'>
      <i (click)='sidebarOpen.next()' class='big sidebar icon inverted' style='color: white;'></i>
    </div>
    <div>
      <div class='ui header inverted' style='font-size: 1.5em'>
        {{title}}
      </div>
      <div class='ui header inverted large-hide small-hide'>
        {{uiState.focusLabel$ | async}}
      </div>
    </div>
  </div>


  </div>
</div>


`
})
export class HeaderHomeComponent implements OnInit {
  @Input() title: string
  @Input() focus: string
  @Input() imageUrl: string

  @HostBinding('class') klass = 'masthead'
  @HostBinding('style') style: string
  @Output() sidebarOpen = new EventEmitter<boolean>()

  public contexts = ['home', 'recruit', 'schedule', 'roster', 'onsite']

  constructor(
    public uiState: OrganizeUiStateService
  ) {}

  ngOnInit() {
    this.style = `background-image: url("${this.imageUrl}")`
  }
}
