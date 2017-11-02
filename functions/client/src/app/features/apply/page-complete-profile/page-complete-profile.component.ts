import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Project } from '../../../../../../universal/domain/project';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { Observable } from 'rxjs'

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
export class PageCompleteProfileComponent implements OnInit {
  @ViewChild(FormCompleteProfileComponent) public profForm: FormCompleteProfileComponent

  public navigateTo: string;
  public editAllMode: boolean;
  public project$: Observable<Project>
  public profile$: Observable<any>
  public actionBarType = ActionBarType

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public action: ProfileActionService,
    public query: ProfileQueryService,
  ) {
    this.route.data.subscribe(data => {
      this.navigateTo = data.navigateTo;
      this.editAllMode = this.navigateTo === 'review-detail'
    });
    this.project$ = this.route.data.switchMap(data => data['project'])
    this.profile$ = this.route.data.switchMap(data => data['profile'])
  }

  ngOnInit() {
    this.profile$.subscribe(profile => this.profForm.profileForm.patchValue(profile))
  };

  public next() {
    console.log('completed profile?', this.profForm.profileForm.value)
    this.auth.current.take(1).subscribe(user => {
      if (this.profForm.profileForm.dirty) {
        this.action.update(user.uid, this.profForm.profileForm.value)
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

  public imageUrl(project) {
    return (project.images.length > 0 ? project.images[0].imageUrl : 'https://placeimg.com/1140/410/people/grayscale')
  }
}
