import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment_ from 'moment';
import { DateTimeRange } from './models/date-time-range';
const moment = moment_;

@Component({
  selector: 'ngx-date-time-range-picker',
  templateUrl: 'date-time-range-picker.component.html',
  styleUrls: ['date-time-range-picker.component.scss']
})
export class DateTimeRangePickerComponent implements OnInit {
  @Input() selectedStart: Date = moment().toDate();
  @Input() selectedEnd: Date = moment().toDate();
  @Output() dateTimeRangeSelected = new EventEmitter<DateTimeRange>();

  startMonthUnavailability: DateTimeRange[];
  endMonthUnavailability: DateTimeRange[];
  openStart = false;
  openEnd = false;
  disabledStart = false;
  disabledEnd = true;

  private startOfBlockEveryting: Date;
  private unavailability: DateTimeRange[][] = [
    [
      { start: new Date(2019, 0, 14, 10, 0), end: new Date(2019, 0, 14, 21, 0) },
      { start: new Date(2019, 0, 16, 10, 0), end: new Date(2019, 0, 18, 18, 0) },
      { start: new Date(2019, 0, 26, 16, 0), end: new Date(2019, 0, 26, 18, 0) },
      { start: new Date(2019, 0, 26, 23, 0), end: new Date(2019, 0, 27, 11, 0) }
    ],
    [{ start: new Date(2019, 1, 26, 23, 0), end: new Date(2019, 1, 27, 11, 0) }],
    [{ start: new Date(2019, 2, 26, 23, 0), end: new Date(2019, 2, 27, 11, 0) }],
    [
      { start: new Date(2019, 3, 18, 10, 0), end: new Date(2019, 3, 21, 21, 0) },
      { start: new Date(2019, 3, 25, 10, 0), end: new Date(2019, 3, 26, 11, 0) },
      { start: new Date(2019, 3, 26, 16, 0), end: new Date(2019, 3, 26, 18, 0) },
      { start: new Date(2019, 3, 26, 23, 0), end: new Date(2019, 3, 27, 11, 0) }
    ],
    [
      { start: new Date(2019, 4, 14, 10, 0), end: new Date(2019, 4, 14, 21, 0) },
      { start: new Date(2019, 4, 16, 10, 0), end: new Date(2019, 4, 18, 18, 0) }
    ],
    [{ start: new Date(2019, 5, 26, 16, 0), end: new Date(2019, 5, 26, 18, 0) }],
    [
      { start: new Date(2019, 6, 26, 16, 0), end: new Date(2019, 6, 26, 18, 0) },
      { start: new Date(2019, 6, 26, 23, 0), end: new Date(2019, 6, 27, 11, 0) }
    ],
    [
      { start: new Date(2019, 7, 14, 10, 0), end: new Date(2019, 7, 14, 21, 0) },
      { start: new Date(2019, 7, 16, 10, 0), end: new Date(2019, 7, 18, 18, 0) }
    ],
    [
      { start: new Date(2019, 8, 14, 10, 0), end: new Date(2019, 8, 14, 21, 0) },
      { start: new Date(2019, 8, 26, 16, 0), end: new Date(2019, 8, 26, 18, 0) },
      { start: new Date(2019, 8, 26, 23, 0), end: new Date(2019, 8, 27, 11, 0) }
    ],
    [{ start: new Date(2019, 9, 14, 10, 0), end: new Date(2019, 9, 14, 21, 0) }],
    [{ start: new Date(2019, 9, 26, 23, 0), end: new Date(2019, 9, 27, 11, 0) }],
    [
      { start: new Date(2019, 9, 14, 10, 0), end: new Date(2019, 9, 14, 21, 0) },
      { start: new Date(2019, 9, 26, 23, 0), end: new Date(2019, 9, 27, 11, 0) }
    ],
    []
  ];

  constructor() {}

  ngOnInit() {
    this.startMonthUnavailability = this.unavailability[this.selectedStart.getMonth() - 1];
    this.evaluateEndMonthUnavailability(this.selectedEnd);
  }

  onDateTimeFromSelected(date: Date) {
    this.selectedStart = date;
    const firstPossibleEndDate = moment(date)
      .add(30, 'minutes')
      .toDate();
    this.selectedEnd = firstPossibleEndDate;
    this.disabledEnd = false;
    this.openEnd = true;
    this.openStart = false;
    this.startOfBlockEveryting = null;
    this.evaluateEndMonthUnavailability(firstPossibleEndDate);
  }

  onDateTimeUntilSelected(date: Date) {
    this.selectedEnd = date;
    this.dateTimeRangeSelected.emit({ start: this.selectedStart, end: this.selectedEnd });
  }

  onStartMonthChanged(date: Date) {
    this.startMonthUnavailability = this.unavailability[date.getMonth()];
  }

  onEndMonthChanged(date: Date) {
    this.evaluateEndMonthUnavailability(date);
  }

  private evaluateEndMonthUnavailability(date: Date) {
    let unavailabilityToUse = [...this.unavailability[date.getMonth()]];
    const isDateAfterSelectedStart = moment(date).isAfter(moment(this.selectedStart), 'minute');
    let blockEverything = false;
    if (this.startOfBlockEveryting) {
      blockEverything = moment(date).isAfter(moment(this.startOfBlockEveryting), 'month');
    }

    if (isDateAfterSelectedStart) {
      if (blockEverything) {
        unavailabilityToUse = this.getFullMonthUnavailability(date);
      } else {
        const filteredUnavailabilities = [];
        for (const unavailability of unavailabilityToUse) {
          if (moment(unavailability.start).isAfter(moment(this.selectedStart, 'minute'))) {
            filteredUnavailabilities.push(
              this.getUnavailabilityUntilTheEndOfTheMonth(unavailability.start)
            );
            this.startOfBlockEveryting = unavailability.start;
            break;
          } else {
            filteredUnavailabilities.push(unavailability);
          }
        }
        unavailabilityToUse = [...filteredUnavailabilities];
      }
    }
    this.endMonthUnavailability = [...unavailabilityToUse];
  }

  private getUnavailabilityUntilTheEndOfTheMonth(start: Date): DateTimeRange {
    const end = moment(start)
      .endOf('month')
      .toDate();

    return { start, end };
  }

  private getFullMonthUnavailability(date: Date): DateTimeRange[] {
    const start = moment(date)
      .startOf('month')
      .toDate();
    const end = moment(date)
      .endOf('month')
      .toDate();

    return [{ start, end }];
  }
}
