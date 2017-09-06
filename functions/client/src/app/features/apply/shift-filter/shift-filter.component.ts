import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Shift } from '../../../../../../universal/domain/shift';
import { Team } from '../../../../../../universal/domain/team';

@Component({
  selector: 'apply-shift-filter',
  templateUrl: './shift-filter.component.html'
})
export class ShiftFilterComponent implements OnChanges {
  @Input() private shifts: Shift[]
  private teamFilter: ITeamFilter[]

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.shifts) {
      const tempTeams = this.shifts.map((data) => <ITeamFilter>({ 'teamKey': data.teamKey, 'teamTitle': data.teamTitle }));
      this.teamFilter = tempTeams.filter((item, pos) => tempTeams.map(t => t.teamKey).indexOf(item.teamKey) === pos)
        .sort((t1, t2) => t1.teamTitle > t2.teamTitle ? 1 : (t2.teamTitle > t1.teamTitle ? -1 : 0));
    }
  }
}

interface ITeamFilter {
  teamKey: string;
  teamTitle: string;
}
