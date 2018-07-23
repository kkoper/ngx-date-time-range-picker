import { Component, OnInit } from '@angular/core';
import { DateTimeRange } from '../models/date-time-range';

@Component({
  selector: 'ngx-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {
  year = 2018;
  currentMonth = 6;
  monthUnavailabilities: DateTimeRange[] = [];

  constructor() {}

  ngOnInit() {}
}
