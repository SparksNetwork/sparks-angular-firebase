import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirebaseObjectObservable } from "angularfire2/database";
import { Project } from "../../../../../universal/domain/project";

@Component({
  selector: 'home-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  public projects: FirebaseObjectObservable<Project[]>;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projects = data['projects'];
    })
  }
}
