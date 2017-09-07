import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';

@Pipe({ name: 'snDateInterval' })
export class DateIntervalPipe implements PipeTransform {

    constructor(private dateFormtPipe: DateFormatPipe) { }

    transform(start: string, ...args: any[]) {

        const startDate = moment(start);
        const endDate = moment(new Date(args[0]));

        let dateString = this.dateFormtPipe.transform(startDate, 'MMM Do');

        if (startDate.year() !== endDate.year()) {
            dateString += (', ' + startDate.year())
        }

        if (endDate.isValid()) {
            dateString += (' - ' + this.dateFormtPipe.transform(endDate, 'MMM Do, YYYY'))
        }

        return dateString.toLowerCase();
    }
}
