import { Component, OnInit } from '@angular/core';
import { DateTimeRange } from 'date-time-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unavailability: DateTimeRange[][] = [
    [
      { start: new Date(2019, 0, 14, 10, 0), end: new Date(2019, 0, 14, 21, 0) },
      { start: new Date(2019, 0, 16, 10, 0), end: new Date(2019, 0, 18, 18, 0) },
      { start: new Date(2019, 0, 26, 16, 0), end: new Date(2019, 0, 26, 18, 0) },
      { start: new Date(2019, 0, 26, 23, 0), end: new Date(2019, 0, 27, 11, 0) }
    ],
    [{ start: new Date(2019, 1, 26, 23, 0), end: new Date(2019, 1, 27, 11, 0) }],
    [{ start: new Date(2019, 2, 26, 23, 0), end: new Date(2019, 2, 27, 11, 0) }],
    [
      { start: new Date(2019, 3, 18, 10, 0), end: new Date(2019, 3, 21, 21, 0) },
      { start: new Date(2019, 3, 25, 10, 0), end: new Date(2019, 3, 26, 11, 0) },
      { start: new Date(2019, 3, 26, 16, 0), end: new Date(2019, 3, 26, 18, 0) },
      { start: new Date(2019, 3, 26, 23, 0), end: new Date(2019, 3, 27, 11, 0) }
    ],
    [
      { start: new Date(2019, 4, 14, 10, 0), end: new Date(2019, 4, 14, 21, 0) },
      { start: new Date(2019, 4, 16, 10, 0), end: new Date(2019, 4, 18, 18, 0) },
      { start: new Date(2019, 4, 18, 10, 0), end: new Date(2019, 4, 21, 21, 0) }
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  monthUnavailability: DateTimeRange[];

  ngOnInit() {
    this.monthUnavailability = this.unavailability[new Date().getMonth()];
  }

  onDateTimeSelected(date: Date) {
    console.log('date-time selected', date);
  }

  onMonthChanged(date: Date) {
    this.monthUnavailability = this.unavailability[date.getMonth()];
    console.log('month changed', date);
  }
}
