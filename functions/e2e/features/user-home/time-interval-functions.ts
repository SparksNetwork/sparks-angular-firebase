import * as moment from 'moment';
import { DateFormatPipe } from 'angular2-moment';


export function getFormatedTimeInterval(startDate: string, endDate: string) {

    const startMoment = moment(new Date(startDate));
    const endMoment = moment(new Date(endDate));

    let dateFormatPipe: DateFormatPipe = new DateFormatPipe()

    let dateString = dateFormatPipe.transform(startMoment, 'MMM Do');

    if (startMoment.year() !== endMoment.year()) {
        dateString += (', ' + startMoment.year())
    }
    if (endMoment.isValid()) {
        dateString += (' - ' + dateFormatPipe.transform(endDate, 'MMM Do, YYYY'))
    }

    return dateString.toLowerCase();

}