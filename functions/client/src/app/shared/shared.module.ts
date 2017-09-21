import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorService } from './validators/validator.service';
import { DateIntervalPipe } from './pipes/date-interval.pipe';
import { SortShiftsByDatePipe } from './pipes/sort-shifts.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ValidatorService,
    DateIntervalPipe,
    SortShiftsByDatePipe
  ]
})
export class SharedModule { }
