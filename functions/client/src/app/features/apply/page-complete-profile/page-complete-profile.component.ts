import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Project } from '../../../../../../universal/domain/project';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';

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
  public navigateTo: string;
  public editAllMode: boolean;
  public project: Project;
  public actionBarType = ActionBarType;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public action: ProfileActionService,
    public query: ProfileQueryService,
  ) {
    this.oppKey = this.route.parent.snapshot.paramMap.get('oppKey');

    this.route.data.subscribe(data => {
      this.navigateTo = data.navigateTo;
      this.editAllMode = this.navigateTo === 'review-detail'
    });

    this.route.parent.snapshot.data['profile'].subscribe(profile => {
      this.profForm.profileForm.get('legalName').setValue(profile.legalName);
      this.profForm.profileForm.get('preferredName').setValue(profile.preferredName);
      this.profForm.profileForm.get('phoneNumber').setValue(profile.phoneNumber);
      this.profForm.profileForm.get('birthday').setValue(profile.birthday);
    });
  }

  ngOnInit() {

    this.route.snapshot.data['project'].subscribe(data => {
      this.project = data;
    });
  };

  public next() {
    console.log('completed profile?', this.profForm.profileForm.value)
    this.auth.current.first().subscribe(user => {
      if (this.profForm.profileForm.dirty) {
        this.action.replace(user.uid, this.profForm.profileForm.value)
          .subscribe(res => {
            if (res.ok) {
              console.log('success!')
              this.checkProfileAndNavigate();
            } else {
              console.log('failed')
            }
          });
      } else {
        this.checkProfileAndNavigate();
      }
    })
  }

  private checkProfileAndNavigate() {
    this.query.current.subscribe(profile => {
      if (profile &&
        profile.birthday &&
        profile.legalName &&
        profile.phoneNumber &&
        profile.preferredName) {

        this.router.navigate(['..', this.navigateTo], { relativeTo: this.route });
      }
    })
  }
}
