import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs"

import { Project } from "../../../../../universal/domain/project";
import { AuthService } from "../../core/snauth/auth/auth.service";
import { Application } from "../../../../../universal/domain/application";

@Component({
  selector: 'home-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  public projects: Observable<Project[]>;
  public applications: Observable<Application[]>;
  public userPrefferedName: string;
  public userMessage: string;
  public userImageUrl: string;
  public userProfileScore: number;
  public isAuthed: boolean;

  constructor(public route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.projects = this.route.snapshot.data['projects']
    this.applications = this.route.snapshot.data['applications']

    this.auth.current.subscribe(user => {
      if (user) {
        this.userPrefferedName = user.displayName;
        this.userMessage = "You just got 20 Karma Points and opened 1 quest and 2 badges";
        this.userImageUrl = user.photoURL || 'assets/img/profile'+  Math.floor(Math.random()*(10)+1) +  '.png';
        this.userProfileScore = 20;
        this.isAuthed = true;
      }
      else {
        this.userPrefferedName = 'Guest';
        this.userMessage = "You first need to sign up before you can level up";
        this.userImageUrl = 'assets/img/profile'+  Math.floor(Math.random()*(10)+1) +  '.png';
        this.userProfileScore = 0;
        
        this.isAuthed = false;
      }
    })
  }
}
