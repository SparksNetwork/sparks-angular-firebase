import { Component, HostBinding, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'
import { Store } from '@ngrx/store'

import { EntState, IdxState } from '../../core/snents/ngrx-ents'

// <div class='sn-gradient'></div>

@Component({
  selector: 'organize-header-home',
  styleUrls: ['./header-home.component.scss'],
  template: `
<div class='header-image' [style.backgroundImage]='"url(" + imageUrl + ")"'>
  <div class='content' style='display: flex; flex-direction: column; justify-content: space-between;'>

  <div class='ui labeled icon fluid five item secondary borderless inverted menu'>
    <a class='active item'>
      <i class='home icon'></i>
      home
    </a>
    <a class='item'>
      <i class='binoculars icon'></i>
      recruit
    </a>
    <a class='item'>
      <i class='calendar icon'></i>
      schedule
    </a>
    <a class='item'>
      <i class='users icon'></i>
      roster
    </a>
    <a class='item'>
      <i class='flag icon'></i>
      onsite
    </a>
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
        {{focus}}
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

  constructor(
  ) {}

  ngOnInit() {
    this.style = `background-image: url("${this.imageUrl}")`
  }
}
