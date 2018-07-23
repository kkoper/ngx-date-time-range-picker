import { Component } from '@angular/core';
import { DateTimeRange } from 'date-time-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  unavailability: DateTimeRange[] = [
    { start: new Date(2018, 9, 14, 10, 0), end: new Date(2018, 9, 14, 21, 0) },
    { start: new Date(2018, 9, 16, 10, 0), end: new Date(2018, 9, 18, 18, 0) },
    { start: new Date(2018, 9, 18, 10, 0), end: new Date(2018, 9, 21, 21, 0) },
    { start: new Date(2018, 9, 25, 10, 0), end: new Date(2018, 9, 26, 11, 0) },
    { start: new Date(2018, 9, 26, 16, 0), end: new Date(2018, 9, 26, 18, 0) },
    { start: new Date(2018, 9, 26, 23, 0), end: new Date(2018, 9, 27, 11, 0) }
  ];

  onDateTimeSelected(date: Date) {
    console.log('date-time selected', date);
  }

  onMonthChanged(date: Date) {
    console.log('month changed', date);
  }
}
