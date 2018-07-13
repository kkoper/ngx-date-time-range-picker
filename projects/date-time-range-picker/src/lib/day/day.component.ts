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

  private _hovered = false;
  @Input()
  get hovered(): boolean {
    return this._hovered;
  }
  set hovered(hover: boolean) {
    if (hover && this.isDayHoverable()) {
      this._hovered = true;
    } else {
      this._hovered = false;
    }
  }

  @Output() selectDay = new EventEmitter<number>();
  @Output() hoverDay = new EventEmitter<number>();

  dayStates = DayState;

  constructor() {}

  ngOnInit() {}

  hoverIn(): void {
    if (this.isDayHoverable()) {
      this.hoverDay.emit(this.value);
    }
  }

  hoverOut(): void {}

  onDaySelected(): void {
    this.selectDay.emit(this.value);
  }

  private isDayHoverable(): boolean {
    return this.status !== DayState.Full && this.status !== DayState.Dummy;
  }
}
