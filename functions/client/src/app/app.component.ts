import { Component } from '@angular/core';

import { sharedMoment } from '../../../universal/sharedMoment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = sharedMoment().toString();
}
