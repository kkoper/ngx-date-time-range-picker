import { NgModule } from '@angular/core';
import { DateTimeRangePickerComponent } from './date-time-range-picker.component';
import { DayComponent } from './day/day.component';

@NgModule({
  imports: [
  ],
  declarations: [DateTimeRangePickerComponent, DayComponent],
  exports: [DateTimeRangePickerComponent]
})
export class DateTimeRangePickerModule { }
