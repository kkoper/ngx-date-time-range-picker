import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment_ from 'moment';
import { DateTimeRange } from '../models/date-time-range';
import { DayState } from '../models/day-state';

const moment = moment_;

@Component({
  selector: 'ngx-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  @Input() month: number;
  @Input() year: number;
  @Input() unavailability: DateTimeRange[];
  @Input() hoverFrom: Date;

  @Output() dateSelected = new EventEmitter<Date>();

  days: Day[] = [];

  private freeDays: number[] = [];
  private partialDays: number[] = [];
  private fullDays: number[] = [];

  constructor() {}

  ngOnInit() {
    this.assessAvailability();

    const dateToUse = moment()
      .year(this.year)
      .month(this.month);
    this.fillMonthDays(dateToUse);
    this.fillDaysBefore(dateToUse);
    this.fillDaysAfter(dateToUse);
  }

  dayHovered(hoveredDay: number): void {
    if (this.hoverFrom) {
      const startDate = moment(this.hoverFrom);
      const dateHovered = moment(new Date(this.year, this.month, hoveredDay));
      if (startDate < dateHovered) {
        let dayToHoverFrom = 1;

        if (moment(this.hoverFrom).month === dateHovered.month) {
          dayToHoverFrom = startDate.date();
        }

        this.days = this.days.map((day: Day) => {
          if (dayToHoverFrom <= day.value && day.value <= hoveredDay) {
            day.hovered = true;
          }

          return day;
        });
      }
    }
  }

  daySelected(day: number): void {
    this.dateSelected.emit(new Date(this.year, this.month, day));
  }

  private fillMonthDays(date: moment_.Moment): void {
    const daysInMonth = date.daysInMonth();

    for (let i = 0; i < daysInMonth; i++) {
      let dayStatus = DayState.Free;
      if (this.fullDays.includes(i + 1)) {
        dayStatus = DayState.Full;
      } else if (this.partialDays.includes(i + 1)) {
        dayStatus = DayState.Partial;
      }
      const newDay: Day = { value: i + 1, status: dayStatus, hovered: false };

      this.days.push(newDay);
    }
  }

  private assessAvailability(): void {
    this.makeAllDaysOfTheMonthFree();

    if (!this.isCurrentDateInFutureMonth()) {
      this.calculateDayAvailabilities();
    }

    this.makeDaysInThePastUnavailable();

    this.freeDays = this.freeDays.filter((value: number) => {
      return !(this.partialDays.includes(value) || this.fullDays.includes(value));
    });
  }

  private calculateDayAvailabilities() {
    let previousEndDate: moment_.Moment;
    for (const block of this.unavailability) {
      const startFreeDayNumber = previousEndDate ? previousEndDate.date() : 0;
      const endFreeDayNumber = moment(block.start).date();
      const startFullDayNumber = moment(block.start).date();
      const endFullDayNumber = moment(block.end).date();
      for (let i = startFreeDayNumber + 1; i < endFreeDayNumber; i++) {
        this.freeDays.push(i);
      }
      this.partialDays.push(endFreeDayNumber);
      this.partialDays.push(endFullDayNumber);
      for (let i = startFullDayNumber + 1; i < endFullDayNumber; i++) {
        this.fullDays.push(i);
      }
      previousEndDate = moment(block.end);
    }
  }

  private makeDaysInThePastUnavailable() {
    if (this.isCurrentDateInSameMonth()) {
      const currentDay = moment().date();
      for (let i = 1; i < currentDay; i++) {
        this.fullDays.push(i);
      }
      this.partialDays.push(currentDay);
    } else if (this.isCurrentDateInFutureMonth()) {
      const endDay = moment()
        .endOf('month')
        .date();
      for (let i = 1; i < endDay + 1; i++) {
        this.fullDays.push(i);
      }
    }
  }

  private isCurrentDateInFutureMonth() {
    return (
      moment().toDate() >
      moment()
        .year(this.year)
        .month(this.month)
        .toDate()
    );
  }

  private isCurrentDateInSameMonth() {
    return moment().month() === this.month && moment().year() === this.year;
  }

  private makeAllDaysOfTheMonthFree() {
    const start = 0;
    const end = moment()
      .year(this.year)
      .month(this.month)
      .endOf('month')
      .date();
    for (let i = start + 1; i < end + 1; i++) {
      this.freeDays.push(i);
    }
  }

  private fillDaysBefore(date: moment_.Moment): void {
    const tempDate = date.clone().date(1);
    const dayInWeek = tempDate.isoWeekday();
    const daysInPreviousMonth = dayInWeek - 1;

    const dummyDaysBefore: Day[] = [];
    for (let i = 0; i < daysInPreviousMonth; i++) {
      const newDay: Day = { value: 0, status: DayState.Dummy, hovered: false, dummyBefore: true };

      dummyDaysBefore.push(newDay);
    }

    this.days = [...dummyDaysBefore, ...this.days];
  }

  private fillDaysAfter(date: moment_.Moment): void {
    const lastDayOfTheMonth = date.daysInMonth();
    const tempDate = date.clone().date(lastDayOfTheMonth);
    const dayInWeek = tempDate.isoWeekday();
    const daysInNextMonth = 7 - dayInWeek;

    const dummyDaysAfter: Day[] = [];
    for (let i = 0; i < daysInNextMonth; i++) {
      const newDay: Day = { value: 0, status: DayState.Dummy, hovered: false, dummyAfter: true };

      dummyDaysAfter.push(newDay);
    }

    this.days = [...this.days, ...dummyDaysAfter];
  }
}

export interface Day {
  value: number;
  status: DayState;
  hovered: boolean;
  dummyBefore?: boolean;
  dummyAfter?: boolean;
}
