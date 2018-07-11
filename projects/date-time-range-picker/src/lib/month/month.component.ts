import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimeRange } from '../models/date-time-range';

@Component({
  selector: 'ngx-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  @Input() month: number;
  @Input() year: number;
  @Input() unavailability: DateTimeRange[];
  @Input() hoverFrom: Date;

  @Output() dateSelected = new EventEmitter<Date>();

  constructor() {}

  ngOnInit() {}
}
