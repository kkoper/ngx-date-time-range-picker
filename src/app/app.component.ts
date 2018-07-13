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
  unavailability: DateTimeRange[] = [
    // { start: new Date(2018, 6, 14, 10, 0), end: new Date(2018, 6, 14, 21, 0) },
    // { start: new Date(2018, 6, 16, 10, 0), end: new Date(2018, 6, 18, 18, 0) },
    // { start: new Date(2018, 6, 18, 10, 0), end: new Date(2018, 6, 21, 21, 0) },
    { start: new Date(2018, 6, 26, 10, 0), end: new Date(2018, 6, 29, 21, 0) }
  ];
  hoverFrom = new Date(2018, 6, 17);

  onDateSelected(date: Date) {
    this.hoverFrom = date;
    console.log('date selected', date);
  }

  onDaySelected(day: number) {
    console.log('day selected', day);
  }

  onDayHovered(day: number) {
    console.log('day hovered', day);
  }
}
