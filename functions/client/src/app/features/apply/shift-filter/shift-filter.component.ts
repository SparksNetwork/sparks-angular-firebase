import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shift } from '../../../../../../universal/domain/shift';
import { DateIntervalPipe } from '../../../shared/pipes/date-interval.pipe';

@Component({
  selector: 'apply-shift-filter',
  templateUrl: './shift-filter.component.html'
})
export class ShiftFilterComponent implements OnInit {
  @Input() private allShifts: Shift[]
  @Output() private activeFilters: EventEmitter<IShiftFilters> = new EventEmitter()
  private teamFilter: ITeamFilter[]
  private dateFilter: IDateFilter[]
  public shiftFilterForm: FormGroup
  public filtersChangedByUser: boolean

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
      this.activeFilters.emit(data);

      this.filtersChangedByUser = this.shiftFilterForm.dirty ||
        !!this.shiftFilterForm.get('team').value ||
        !!this.shiftFilterForm.get('friend').value;
    })
  }

  ngOnInit() {
    if (this.allShifts) {
      setTimeout(() => {
        this.teamFilter = this.getUniqueTeams();
        this.dateFilter = this.getUniqueDates();
        this.initializeFilters();
      });
    }
  }

  /**
   * Gets the unique teamKey - teamTitle pairs from the shifts, ordered by teamTitle.
   */
  private getUniqueTeams(): ITeamFilter[] {
    const tempTeams = this.allShifts
      .map((data) => <ITeamFilter>(
        {
          'teamKey': data.teamKey,
          'teamTitle': data.teamTitle
        }));

    return tempTeams
      .filter((item, pos) => tempTeams.map(t => t.teamKey).indexOf(item.teamKey) === pos)
      .sort((t1, t2) => t1.teamTitle > t2.teamTitle ? 1 : (t2.teamTitle > t1.teamTitle ? -1 : 0));
  }

  /**
   * Gets the unique date - displayDate pairs from the shifts, ordered by date.
   */
  private getUniqueDates(): IDateFilter[] {
    const tempDates = this.allShifts
      .sort((d1, d2) => new Date(d1.startDateTime).getTime() - new Date(d2.startDateTime).getTime())
      .map((data) => <IDateFilter>(
        {
          'date': this.formatDate(data.startDateTime),
          'dateDisplay': this.formatDateDisplay(data.startDateTime)
        }));

    return tempDates
      .filter((item, pos) => tempDates.map(d => d.dateDisplay).indexOf(item.dateDisplay) === pos);
  }

  /**
   * Gets the date part of the date ISO string, excluding the time
   * @param dateTime The date ISO string
   */
  private formatDate(dateTime: string): string {
    if (!dateTime || dateTime.indexOf('T') < 0) {
      return null;
    }
    return dateTime.substring(0, dateTime.indexOf('T'));
  }

  /**
   * Formats the date for display
   * @param dateTime The date ISO string
   */
  private formatDateDisplay(dateTime: string): string {
    return this.dateIntervalPipe.transform(dateTime);
  }

  public initializeFilters() {
    if (this.dateFilter && this.dateFilter.length) {
      this.shiftFilterForm.patchValue({ date: this.dateFilter[0].date });
    }
    this.shiftFilterForm.patchValue({ team: '', friend: '' });
    this.filtersChangedByUser = false;
  }
}

interface ITeamFilter {
  teamKey: string;
  teamTitle: string;
}

interface IDateFilter {
  date: string;
  dateDisplay: string;
}

export interface IShiftFilters {
  date: string;
  team: string;
  friend: string;
}
