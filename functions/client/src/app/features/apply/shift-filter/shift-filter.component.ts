import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shift } from '../../../../../../universal/domain/shift';
import { DateIntervalPipe } from '../../../shared/pipes/date-interval.pipe';

@Component({
  selector: 'apply-shift-filter',
  templateUrl: './shift-filter.component.html'
})
export class ShiftFilterComponent implements OnChanges {
  @Input() private shifts: Shift[]
  private teamFilter: ITeamFilter[]
  private dateFilter: string[]
  public shiftFilterForm: FormGroup;

  constructor(
    private dateIntervalPipe: DateIntervalPipe,
    private builder: FormBuilder
  ) {
    this.shiftFilterForm = this.builder.group({
      date: [''],
      team: [''],
      friend: ['']
    });

    this.shiftFilterForm.valueChanges.subscribe(data => {
      console.log('form changes', data)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.shifts) {
      this.teamFilter = this.getUniqueTeams();
      this.dateFilter = this.getUniqueDates();
      this.shiftFilterForm.patchValue({date: this.dateFilter[0]});
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
    return this.dateIntervalPipe.transform(dateTime);
  }
}

interface ITeamFilter {
  teamKey: string;
  teamTitle: string;
}
