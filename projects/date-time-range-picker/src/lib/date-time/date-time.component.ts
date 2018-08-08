import { Time } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import * as moment_ from 'moment';
import { DateTimeRange } from '../models/date-time-range';
const moment = moment_;

@Component({
  selector: 'ngx-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DateTimeComponent implements OnInit {
  @Input() monthUnavailabilities: DateTimeRange[] = [];
  @Input() startFrom: Date;
  @Input() selectedDate: Date;
  @Input() isDisabled: boolean;
  @Input()
  set isOpen(value: boolean) {
    this.showDatePicker = value;
  }
  @Output() monthChanged = new EventEmitter<Date>();
  @Output() dateTimeSelected = new EventEmitter<Date>();
  @Output() advanceFlow = new EventEmitter<void>();

  activeMoment: moment_.Moment = moment();
  showDatePicker: boolean;
  showTimePicker: boolean;
  dateSelected: boolean;
  timeSelected: boolean;

  // Time component needs:
  timeUnavailabilities: DateTimeRange[] = [];

  constructor() {}

  ngOnInit() {}

  onDayMonthSelected(selectedDate: Date): void {
    this.calcuateTimeUnavailabilities(selectedDate);
    this.activeMoment = moment(selectedDate);
    this.selectedDate = selectedDate;
    this.dateTimeSelected.emit(this.selectedDate);
    this.dateSelected = true;
    this.showDatePicker = false;
    this.showTimePicker = true;
  }

  onTimeSelected(selectedTime: Time): void {
    this.activeMoment = this.activeMoment
      .clone()
      .hour(selectedTime.hours)
      .minute(selectedTime.minutes)
      .startOf('minute');
    this.selectedDate = this.activeMoment.toDate();
    this.dateTimeSelected.emit(this.selectedDate);

    this.showTimePicker = false;
    this.timeSelected = true;

    this.advanceFlow.emit();
  }

  onMonthChanged(date: Date): void {
    this.activeMoment = moment(date);
    this.monthChanged.emit(date);
  }

  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  toggleTimePicker(): void {
    this.showTimePicker = !this.showTimePicker;
  }

  private calcuateTimeUnavailabilities(date: Date): void {
    // Get only unavailabilities that affect the time for that day
    const newTimeUnavailabilities: DateTimeRange[] = [];
    const selectedDay = moment(date);
    const now = moment();

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

    if (selectedDay.isSame(now, 'day')) {
      const startMoment = moment().startOf('day');
      const endMoment = moment().add(30, 'minutes');
      newTimeUnavailabilities.push({ start: startMoment.toDate(), end: endMoment.toDate() });
    }
    if (selectedDay.isSame(this.startFrom, 'day')) {
      const startMoment = moment(this.startFrom).startOf('day');
      const endMoment = moment(this.startFrom).add(30, 'minutes');
      newTimeUnavailabilities.push({ start: startMoment.toDate(), end: endMoment.toDate() });
    }

    this.timeUnavailabilities = [...newTimeUnavailabilities];
  }
}
