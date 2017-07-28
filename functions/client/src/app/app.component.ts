import { Component } from '@angular/core';

import { sharedMoment } from '../../../shared/sharedMoment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = sharedMoment().toString();
}
