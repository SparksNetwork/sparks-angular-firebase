import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirebaseObjectObservable } from "angularfire2/database";

import { Project } from "../../../../../universal/domain/project";
import { AuthService } from "../../core/snauth/auth/auth.service";
import { Application } from "../../../../../universal/domain/application";

@Component({
  selector: 'home-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  public projects: FirebaseObjectObservable<Project[]>;
  public applications: FirebaseObjectObservable<Application[]>;
  public userPrefferedName: string;
  public userMessage: string;
  public userImageUrl: string;
  public userProfileScore: number;

  constructor(public route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projects = data['projects'];
      this.applications = data['applications'];
    })

    this.auth.current.subscribe(user => {
      if (user) {
        this.userPrefferedName = user.displayName;
        this.userMessage = "You just got 20 Karma Points and opened 1 quest and 2 badges";
        this.userImageUrl = user.photoURL || 'https://placeimg.com/85/85/people/grayscale';
        this.userProfileScore = 20;
      }
      else {
        this.userPrefferedName = 'Guest';
        this.userMessage = "You need first register before you can level up";
        this.userImageUrl = 'https://placeimg.com/85/85/people/grayscale';
        this.userProfileScore = 0;
      }
    })
  }
}
