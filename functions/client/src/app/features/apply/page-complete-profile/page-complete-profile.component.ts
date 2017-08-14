import { Component, ViewChild } from '@angular/core';

import { FormCompleteProfileComponent } from '../form-complete-profile/form-complete-profile.component'

@Component({
  selector: 'apply-page-complete-profile',
  templateUrl: './page-complete-profile.component.html',
})
export class PageCompleteProfileComponent {
  @ViewChild(FormCompleteProfileComponent) public profForm: FormCompleteProfileComponent

  constructor() { }

  public next() {
    console.log('completed profile?', this.profForm.profileForm.value)
  }
}
