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
    { start: new Date(2018, 7, 17, 10, 0), end: new Date(2018, 7, 19, 21, 0) }
  ];
  hoverFrom = new Date(2018, 1, 1);

  onDateSelected(date: Date) {
    console.log('date selected', date);
  }

  onDaySelected(day: number) {
    console.log('day selected', day);
  }

  onDayHovered(day: number) {
    console.log('day hovered', day);
  }
}
