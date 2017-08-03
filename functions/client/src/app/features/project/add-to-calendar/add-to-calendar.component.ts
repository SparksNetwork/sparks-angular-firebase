import { Component, OnInit, Input } from '@angular/core';
import FileSaver from 'file-saver';
import * as moment from 'moment'

function clearLineBreaks(input: string) {
  return input ? input.replace(/\n/g, '\\n') : ''
}

function uid() {
    return Math.random().toString(36).substr(2);
}

function universalTime(timestamp?: string, timezone?: number) : string {
  const dt = moment(timestamp)
  if (timezone) {
    dt.utcOffset(timezone)
  }
  return dt.format('YYYYMMDDTHHmmss')
}

@Component({
  selector: 'project-add-to-calendar',
  template: '<a target="_blank" href="{{url}}">add to calendar</a>',
})
export class AddToCalendarComponent implements OnInit {
  @Input() startDateTime: string
  @Input() endDateTime: string
  @Input() title: string
  @Input() location: string
  @Input() description: string

  public url: string

  constructor() {
      this.url = 'https://www.google.com/calendar/render?action=TEMPLATE';
      this.url += '&text=' + encodeURIComponent(this.title);
      this.url += '&dates=' + encodeURIComponent(this.startDateTime) + '/' + encodeURIComponent(this.endDateTime);
      this.url += '&details=' + encodeURIComponent(this.description);
      this.url += '&location=' + encodeURIComponent(this.location);
  }

  ngOnInit() {
    // this.googleUrl = this.addToCalendarService.getGoogleCalendarUrl(this.data);
    // this.microsoftUrl = this.addToCalendarService.getMicrosoftCalendarUrl(this.data);
  }

  downloadIcal($event) {
    $event.preventDefault();

    const fileName = this.title ? this.title.replace(/[^\w ]+/g, '') + '.ics' : 'event.ics'
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'CLASS:PUBLIC',
      'DESCRIPTION:' + clearLineBreaks(this.description),
      'DTSTART:' + universalTime(this.startDate),
      'DTEND:' + universalTime(this.endDate),
      'LOCATION:' + clearLineBreaks(this.location),
      'SUMMARY:' + clearLineBreaks(this.title),
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
      'END:VCALENDAR',
      'UID:' + uid(),
      'DTSTAMP:' + universalTime(),
      'PRODID:angular-addtocalendar'
    ].join('\n');
    const icsBlob = new Blob([icsData], {type: 'application/octet-stream'})

    FileSaver.saveAs(icsBlob, fileName)
  }
}