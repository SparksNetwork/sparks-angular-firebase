import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateFormatPipe } from 'angular2-moment';
import { Shift } from '../../../../../../universal/domain/shift';

@Component({
  selector: 'apply-shift-filter',
  templateUrl: './shift-filter.component.html'
})
export class ShiftFilterComponent implements OnChanges {
  @Input() private shifts: Shift[]
  private teamFilter: ITeamFilter[]
  private dateFilter: string[]

  constructor(
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.shifts) {
      this.teamFilter = this.getUniqueTeams();
      this.dateFilter = this.getUniqueDates();
    }
  }

  private getUniqueTeams(): ITeamFilter[] {
    const tempTeams = this.shifts
      .map((data) => <ITeamFilter>({ 'teamKey': data.teamKey, 'teamTitle': data.teamTitle }));

    return tempTeams
      .filter((item, pos) => tempTeams.map(t => t.teamKey).indexOf(item.teamKey) === pos)
      .sort((t1, t2) => t1.teamTitle > t2.teamTitle ? 1 : (t2.teamTitle > t1.teamTitle ? -1 : 0));
  }

  private getUniqueDates(): string[] {
    const tempDates = this.shifts
      .sort((d1, d2) => new Date(d1.startDateTime).getTime() - new Date(d2.startDateTime).getTime())
      .map((data) => this.formatDate(data.startDateTime));

    return tempDates
      .filter((item, pos) => tempDates.indexOf(item) === pos);
  }

  private formatDate(dateTime: string): string {
    const now = new Date();
    const date = new Date(dateTime);
    const format = date.getFullYear() === now.getFullYear() ? 'MMM D' : 'MMM D, YYYY'
    return this.dateFormatPipe.transform(dateTime, format);
  }
}

interface ITeamFilter {
  teamKey: string;
  teamTitle: string;
}
