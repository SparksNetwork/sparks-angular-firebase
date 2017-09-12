import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';

@Pipe({ name: 'snDateTimeInterval' })
export class DateTimeIntervalPipe implements PipeTransform {

    constructor(private dateFormtPipe: DateFormatPipe) { }

    transform(start: string, ...args: any[]) {

        const startDateTime = moment(start);
        const endDateTime = moment(new Date(args[0]));
        const now = moment(new Date());

        let dateString = this.dateFormtPipe.transform(startDateTime, 'MMM Do');

        if (startDateTime.year() !== now.year()) {
            dateString += (', ' + startDateTime.year());
        }

        dateString += (' ' + this.dateFormtPipe.transform(startDateTime, 'h:mm a'));

        if (endDateTime.isValid()) {
            if (endDateTime.date() === startDateTime.date()) {
                dateString += (' - ' + this.dateFormtPipe.transform(endDateTime, 'h:mm a'));
            } else {
                dateString += (' - ' + this.dateFormtPipe.transform(endDateTime, 'MMM Do'));
                if (endDateTime.year() !== startDateTime.year()) {
                    dateString += (', ' + endDateTime.year());
                }
                dateString += (' ' + this.dateFormtPipe.transform(endDateTime, 'h:mm a'));
            }
        }

        return dateString.toLowerCase();
    }
}
