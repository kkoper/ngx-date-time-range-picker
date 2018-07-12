import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DayState } from '../models/day-state';

@Component({
  selector: 'ngx-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() value?: number;
  @Input() status: DayState;
  @Input() hovered: boolean;

  @Output() selectDay = new EventEmitter<number>();
  @Output() hoverDay = new EventEmitter<number>();

  dayStates = DayState;

  constructor() {}

  ngOnInit() {}

  hoverIn(): void {
    this.hovered = true;
    this.hoverDay.emit(this.value);
  }

  hoverOut(): void {
    this.hovered = false;
  }

  onDaySelected(): void {
    this.selectDay.emit(this.value);
  }
}
