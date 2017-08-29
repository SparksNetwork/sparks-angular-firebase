import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { AuthService } from '../../../core/snauth/auth/auth.service'
import {
  ProfileActionService,
  ProfileQueryService,
} from '../../../core/sndomain/profile'

import { FormCompleteProfileComponent } from '../form-complete-profile/form-complete-profile.component'

@Component({
  selector: 'apply-page-complete-profile',
  templateUrl: './page-complete-profile.component.html',
})
export class PageCompleteProfileComponent {
  @ViewChild(FormCompleteProfileComponent) public profForm: FormCompleteProfileComponent

  public oppKey: string

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public action: ProfileActionService,
    public query: ProfileQueryService,
  ) {
    this.route.snapshot.data['opp'].subscribe(opp => {
      this.oppKey = opp.$key;
    });

    this.route.snapshot.data['profile'].subscribe(profile => {
      console.log(profile)
      this.profForm.profileForm.get('legalName').setValue(profile.legalName);
      this.profForm.profileForm.get('preferredName').setValue(profile.preferredName);
      this.profForm.profileForm.get('phoneNumber').setValue(profile.phoneNumber);
      this.profForm.profileForm.get('birthday').setValue(profile.birthday);
    });
  }

  public next() {
    console.log('completed profile?', this.profForm.profileForm.value)
    this.auth.current.first().subscribe(user => {
      console.log('uid', user.uid)
      this.action.replace(user.uid, this.profForm.profileForm.value)
        .subscribe(res => {
          if (res.ok) {
            console.log('success!')
            this.query.current.subscribe(profile => {
              if (profile &&
                  profile.birthday &&
                  profile.legalName &&
                  profile.phoneNumber &&
                  profile.preferredName) {
                this.router.navigate(['/apply', this.oppKey, 'answer-question'])
              }
            })
          } else {
            console.log('failed')
          }
        })
    })
  }
}
