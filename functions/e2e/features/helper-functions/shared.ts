import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';

export function getDateIntervalForShift(start: string, end: string): string {
    const startDateTime = moment(new Date(start));
    const endDateTime = moment(new Date(end));

    let dateFormatPipe: DateFormatPipe = new DateFormatPipe()

    const now = moment(new Date());

    let dateString = dateFormatPipe.transform(startDateTime, 'MMM Do');

    if (startDateTime.year() !== now.year()) {
        dateString += (', ' + startDateTime.year());
    }

    dateString += (' ' + dateFormatPipe.transform(startDateTime, 'h:mm a'));

    if (endDateTime.isValid()) {
        if (endDateTime.date() === startDateTime.date()) {
            dateString += (' - ' + dateFormatPipe.transform(endDateTime, 'h:mm a'));
        } else {
            dateString += (' - ' + dateFormatPipe.transform(endDateTime, 'MMM Do'));
            if (endDateTime.year() !== startDateTime.year()) {
                dateString += (', ' + endDateTime.year());
            }
            dateString += (' ' + dateFormatPipe.transform(endDateTime, 'h:mm a'));
        }
    }

    return dateString.toLowerCase();
}