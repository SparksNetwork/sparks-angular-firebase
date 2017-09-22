import * as moment from 'moment';
import { DateFormatPipe } from 'angular2-moment';


export function getFormatedTimeInterval(start: string, end: string) {

    let dateFormatPipe: DateFormatPipe = new DateFormatPipe()

    const startDate = moment(new Date(start));
    const endDate = moment(new Date(end));

    let dateString = dateFormatPipe.transform(startDate, 'MMM Do');

    if (startDate.year() !== endDate.year()) {
        dateString += (', ' + startDate.year())
    }

    if (endDate.isValid()) {
        dateString += (' - ' + dateFormatPipe.transform(endDate, 'MMM Do, YYYY'))
    }





    const yearIndex = dateString.indexOf(',');
    dateString = yearIndex > -1 ? dateString.substring(0, yearIndex) : dateString;

    return dateString.toLowerCase();

}