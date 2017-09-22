import { Component, OnInit, Input } from '@angular/core';
import { DateIntervalPipe } from '../../../shared/pipes/date-interval.pipe';

@Component({
  selector: 'project-project-date',
  templateUrl: './project-date.component.html'
})
export class ProjectDateComponent implements OnInit {

  @Input() startDateTime: string;
  @Input() endDateTime: string;
  @Input() title: string;
  @Input() location: string;
  @Input() description: string;
  public dateInterval: string;
  public year: string;

  readonly dateFormat = 'MMM d';

  constructor(private dateIntervalPipe: DateIntervalPipe) { }

  ngOnInit() {
    const dInt = this.dateIntervalPipe.transform(this.startDateTime, this.endDateTime);
    const yearIndex = dInt.indexOf(',');
    this.dateInterval = yearIndex > -1 ? dInt.substring(0, yearIndex) : dInt;
    this.year = yearIndex > -1 ? dInt.substring(yearIndex + 2, dInt.length) : '';
  }

}
