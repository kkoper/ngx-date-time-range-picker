import { Time } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import * as moment_ from 'moment';
import { DateTimeRange } from '../models/date-time-range';

const moment = moment_;

@Component({
  selector: 'ngx-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TimeComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  unavailabilities: DateTimeRange[];
  @Input()
  selectedDate: Date;
  @Output()
  timeSelected = new EventEmitter<Time>();

  public selectedTimeOption: TimeSegment;
  timeOptions: TimeSegment[];

  constructor() {}

  ngOnChanges() {
    this.initializeTimeSegments();
    this.applyUnavailabilities();
  }

  ngOnInit() {
    this.initializeTimeSegments();
    this.setupSelectedTime();
    this.applyUnavailabilities();
  }

  ngAfterViewInit() {
    this.scrollToSelectedTime();
  }

  onTimeSelected(value: TimeSegment): void {
    if (!value.isBlocked) {
      this.selectedTimeOption = value;
      this.timeSelected.emit({ hours: value.hour, minutes: value.minute });
    }
  }

  private scrollToSelectedTime(): void {
    if (document) {
      let el: any;
      if (this.selectedTimeOption) {
        el = document.getElementById(
          `${this.selectedTimeOption.hour}:${this.selectedTimeOption.minute}`
        );
      } else {
        el = document.getElementById('13:30');
      }
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' });
      }
    }
  }

  private applyUnavailabilities(): void {
    const currentDay = moment(this.selectedDate);
    for (const unavailability of this.unavailabilities) {
      const startMoment = moment(unavailability.start);
      const endMoment = moment(unavailability.end);

      if (startMoment.isSame(currentDay, 'day')) {
        if (endMoment.isSame(currentDay, 'day')) {
          this.handleUnavailabilityWithinTheDay(unavailability);
        } else {
          this.handleUnavailabilityOverlappingEndOfDay(unavailability);
        }
      } else {
        if (endMoment.isSame(currentDay, 'day')) {
          this.handleUnavailabilityOverlappingBeginOfDay(unavailability);
        } else {
          this.handleUnavailabilityOverlappingFullDay();
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

  private handleUnavailabilityOverlappingFullDay(): any {
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

  private setupSelectedTime(): void {
    if (this.selectedDate) {
      this.selectedTimeOption = {
        hour: this.selectedDate.getHours(),
        minute: this.selectedDate.getMinutes(),
        isBlocked: false
      } as TimeSegment;
    }
  }
}

export interface TimeSegment {
  hour: number;
  minute: number;
  isBlocked: boolean;
}
