import { Component, OnInit } from '@angular/core';
import * as moment_ from 'moment';
import { DateTimeRange } from '../models/date-time-range';
const moment = moment_;

@Component({
  selector: 'ngx-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {
  // Month component needs:
  year: number;
  currentMonth: number;
  monthUnavailabilities: DateTimeRange[] = [];

  // Time component needs:
  timeUnavailabilities: DateTimeRange[] = [];
  selectedDayMonth: Date = new Date();

  // Computed values:
  get monthName(): string {
    return moment()
      .month(this.currentMonth)
      .format('MMMM');
  }

  constructor() {}

  ngOnInit() {
    this.year = moment().year();
    this.currentMonth = moment().month();
  }

  goToPreviousMonth(): void {
    const previousMonth = moment()
      .subtract(1, 'months')
      .month();
    const previousYear = moment()
      .subtract(1, 'months')
      .year();

    this.year = previousYear;
    this.currentMonth = previousMonth;
  }
}
