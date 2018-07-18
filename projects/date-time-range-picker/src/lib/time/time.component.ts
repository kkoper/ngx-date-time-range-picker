import { Time } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import * as moment_ from 'moment';
import { DateTimeRange } from '../models/date-time-range';

const moment = moment_;

@Component({
  selector: 'ngx-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeComponent implements OnInit {
  @Input() unavailabilities: DateTimeRange[];
  @Input() selectedDate: Date;
  @Output() timeSelected = new EventEmitter<Time>();

  private _selectedTimeOption: TimeSegment;
  get selectedTimeOption(): TimeSegment {
    if (!this._selectedTimeOption) {
      this._selectedTimeOption = { hour: 9, minute: 0, isBlocked: false };
    }
    return this._selectedTimeOption;
  }
  set selectedTimeOption(value: TimeSegment) {
    this._selectedTimeOption = value;
    this.timeSelected.emit({ hours: value.hour, minutes: value.minute });
  }
  timeOptions: TimeSegment[];

  constructor() {}

  ngOnInit() {
    this.initializeTimeSegments();
    this.applyUnavailabilities();
  }

  compareFn(t1: TimeSegment, t2: TimeSegment): boolean {
    return t1 && t2 && t1.hour === t2.hour && t1.minute === t2.minute;
  }

  private applyUnavailabilities(): void {
    for (const unavailability of this.unavailabilities) {
      const startMoment = moment(unavailability.start);
      const endMoment = moment(unavailability.end);
      const currentDay = moment(this.selectedDate);

      if (this.isSameDay(startMoment, currentDay)) {
        if (this.isSameDay(endMoment, currentDay)) {
          this.handleUnavailabilityWithinTheDay(unavailability);
        } else {
          this.handleUnavailabilityOverlappingEndOfDay(unavailability);
        }
      } else {
        if (this.isSameDay(endMoment, currentDay)) {
          this.handleUnavailabilityOverlappingBeginOfDay(unavailability);
        } else {
          this.handleUnavailabilityOverlappingFullDay(unavailability);
        }
      }
    }
  }

  private handleUnavailabilityWithinTheDay(unavailability: DateTimeRange): any {
    const startTime: Time = {
      hours: unavailability.start.getHours(),
      minutes: unavailability.start.getMinutes()
    };
    const endTime: Time = {
      hours: unavailability.end.getHours(),
      minutes: unavailability.end.getMinutes()
    };
    this.makeTimesBlocked(startTime, endTime);
  }

  private handleUnavailabilityOverlappingEndOfDay(unavailability: DateTimeRange): any {
    const startTime: Time = {
      hours: unavailability.start.getHours(),
      minutes: unavailability.start.getMinutes()
    };
    const endTime: Time = {
      hours: 23,
      minutes: 59
    };
    this.makeTimesBlocked(startTime, endTime);
  }

  private handleUnavailabilityOverlappingBeginOfDay(unavailability: DateTimeRange): any {
    const startTime: Time = {
      hours: 0,
      minutes: 0
    };
    const endTime: Time = {
      hours: unavailability.end.getHours(),
      minutes: unavailability.end.getMinutes()
    };
    this.makeTimesBlocked(startTime, endTime);
  }

  private handleUnavailabilityOverlappingFullDay(unavailability: DateTimeRange): any {
    const startTime: Time = {
      hours: 0,
      minutes: 0
    };
    const endTime: Time = {
      hours: 23,
      minutes: 59
    };
    this.makeTimesBlocked(startTime, endTime);
  }

  private makeTimesBlocked(startTime: Time, endTime: Time): any {
    this.timeOptions = this.timeOptions.map((timeOption: TimeSegment) => {
      if (timeOption.hour === startTime.hours && timeOption.minute >= startTime.minutes) {
        timeOption.isBlocked = true;
      } else if (timeOption.hour === endTime.hours && timeOption.minute <= endTime.minutes) {
        timeOption.isBlocked = true;
      } else if (timeOption.hour > startTime.hours && timeOption.hour < endTime.hours) {
        timeOption.isBlocked = true;
      }

      return timeOption;
    });
  }

  private isSameDay(firstDate: moment_.Moment, secondDate: moment_.Moment): boolean {
    if (
      firstDate.year() === secondDate.year() &&
      firstDate.month() === secondDate.month() &&
      firstDate.day() === secondDate.day()
    ) {
      return true;
    }
    return false;
  }

  private initializeTimeSegments(): void {
    const times: TimeSegment[] = [];
    for (let i = 0; i < 24; i++) {
      const fixedTimeSegment: TimeSegment = {
        hour: i,
        minute: 0,
        isBlocked: false
      };
      const halfTimeSegment: TimeSegment = {
        hour: i,
        minute: 30,
        isBlocked: false
      };

      times.push(fixedTimeSegment);
      times.push(halfTimeSegment);
    }

    this.timeOptions = [...times];
  }
}

export interface TimeSegment {
  hour: number;
  minute: number;
  isBlocked: boolean;
}
