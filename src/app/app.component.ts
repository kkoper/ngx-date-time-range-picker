import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { DateTimeRange, DayState } from 'date-time-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dayStatuses = DayState;

  month = 6;
  year = 2018;
  hoverFrom = new Date(2018, 6, 17);
  unavailability: DateTimeRange[] = [
    // { start: new Date(2018, 6, 14, 10, 0), end: new Date(2018, 6, 14, 21, 0) },
    // { start: new Date(2018, 6, 16, 10, 0), end: new Date(2018, 6, 18, 18, 0) },
    // { start: new Date(2018, 6, 18, 10, 0), end: new Date(2018, 6, 21, 21, 0) },
    { start: new Date(2018, 6, 25, 10, 0), end: new Date(2018, 6, 26, 11, 0) },
    { start: new Date(2018, 6, 26, 16, 0), end: new Date(2018, 6, 26, 18, 0) },
    { start: new Date(2018, 6, 26, 23, 0), end: new Date(2018, 6, 27, 11, 0) }
  ];

  // For the time component
  selectedDate = new Date(2018, 6, 26);

  onDateSelected(date: Date) {
    this.hoverFrom = date;
    console.log('date selected', date);
  }

  onDaySelected(day: number) {
    console.log('day selected', day);
  }

  onTimeSelected(time: Time) {
    console.log('time selected', time);
  }

  onDayHovered(day: number) {
    console.log('day hovered', day);
  }
}
