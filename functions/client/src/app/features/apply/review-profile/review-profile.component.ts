import { Component, OnInit, Input } from '@angular/core';
import { Profile } from "../../../../../../universal/domain/profile";

@Component({
  selector: 'apply-review-profile',
  templateUrl: './review-profile.component.html'
})
export class ReviewProfileComponent implements OnInit {

  @Input() profile: Profile;

  constructor() { }

  ngOnInit() {
  }

}
