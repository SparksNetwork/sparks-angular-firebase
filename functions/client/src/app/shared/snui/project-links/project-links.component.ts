import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'snui-project-project-links',
  templateUrl: './project-links.component.html'
})
export class ProjectLinksComponent implements OnInit {

  @Input() projectPageUrl: string;
  @Input() shareKarmaPoints: number;
  @Input() facebookUrl: number;
  @Input() twitterUrl: number;
  
  constructor() { }

  ngOnInit() {
  }

}
