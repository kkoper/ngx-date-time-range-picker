import { Component, OnInit } from '@angular/core';
import { DateTimeRange } from 'projects/date-time-range-picker/src/public_api';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Date time range picker';
  defaultStartDate = new Date(2019, 0, 1);
  defaultEndDate = new Date(2019, 0, 1);

  startDate: Date;
  endDate: Date;
  private unavailability: DateTimeRange[][] = [
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
      { start: new Date(2019, 4, 16, 10, 0), end: new Date(2019, 4, 18, 18, 0) }
    ],
    [{ start: new Date(2019, 5, 26, 16, 0), end: new Date(2019, 5, 26, 18, 0) }],
    [
      { start: new Date(2019, 6, 26, 16, 0), end: new Date(2019, 6, 26, 18, 0) },
      { start: new Date(2019, 6, 26, 23, 0), end: new Date(2019, 6, 27, 11, 0) }
    ],
    [
      { start: new Date(2019, 7, 14, 10, 0), end: new Date(2019, 7, 14, 21, 0) },
      { start: new Date(2019, 7, 16, 10, 0), end: new Date(2019, 7, 18, 18, 0) }
    ],
    [
      { start: new Date(2019, 8, 14, 10, 0), end: new Date(2019, 8, 14, 21, 0) },
      { start: new Date(2019, 8, 26, 16, 0), end: new Date(2019, 8, 26, 18, 0) },
      { start: new Date(2019, 8, 26, 23, 0), end: new Date(2019, 8, 27, 11, 0) }
    ],
    [{ start: new Date(2019, 9, 14, 10, 0), end: new Date(2019, 9, 14, 21, 0) }],
    [{ start: new Date(2019, 9, 26, 23, 0), end: new Date(2019, 9, 27, 11, 0) }],
    [
      { start: new Date(2019, 9, 14, 10, 0), end: new Date(2019, 9, 14, 21, 0) },
      { start: new Date(2019, 9, 26, 23, 0), end: new Date(2019, 9, 27, 11, 0) }
    ],
    []
  ];

  public onGetMonthUnavailability = (date: Date): Observable<DateTimeRange[]> => {
    const unavailabilityToReturn = this.unavailability[date.getMonth()];
    return of(unavailabilityToReturn);
  }

  ngOnInit() {}

  onDateTimeRangeSelected(range: DateTimeRange) {
    this.startDate = range.start;
    this.endDate = range.end;
  }
}
