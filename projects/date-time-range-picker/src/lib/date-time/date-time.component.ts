import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment_ from 'moment';
import { DateTimeRange } from '../models/date-time-range';
const moment = moment_;

@Component({
  selector: 'ngx-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {
  @Input() monthUnavailabilities: DateTimeRange[] = [];
  @Output() getMonthUnavailabilities = new EventEmitter<Date>();
  @Output() dateTimeSelected = new EventEmitter<Date>();

  // Month component needs:
  year: number;
  currentMonth: number;

  // Time component needs:
  timeUnavailabilities: DateTimeRange[] = [];
  selectedDate: Date = new Date();

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

  goToNextMonth(): void {
    const nextMonth = moment()
      .add(1, 'months')
      .month();
    const nextYear = moment()
      .add(1, 'months')
      .year();

    this.year = nextYear;
    this.currentMonth = nextMonth;
  }

  onDayMonthSelected(selectedDate: Date): void {
    this.calcuateTimeUnavailabilities(selectedDate);
    this.selectedDate = selectedDate;
  }

  onTimeSelected(selectedTime: Time): void {
    const dateToEmit = moment(this.selectedDate)
      .hour(selectedTime.hours)
      .minute(selectedTime.minutes)
      .startOf('minute');
    this.dateTimeSelected.emit(dateToEmit.toDate());
  }

  private calcuateTimeUnavailabilities(date: Date): void {
    // Get only unavailabilities that affect the time for that day
    const newTimeUnavailabilities: DateTimeRange[] = [];
    const selectedDay = moment(date);

    for (const unavailability of this.monthUnavailabilities) {
      const startMoment = moment(unavailability.start);
      const endMoment = moment(unavailability.end);

      if (
        (startMoment.isBefore(selectedDay, 'day') || startMoment.isSame(selectedDay, 'day')) &&
        (endMoment.isAfter(selectedDay, 'day') || endMoment.isSame(selectedDay, 'day'))
      ) {
        newTimeUnavailabilities.push(unavailability);
      }
    }

    this.timeUnavailabilities = [...newTimeUnavailabilities];
  }
}
