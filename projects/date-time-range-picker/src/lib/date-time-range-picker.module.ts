import { NgModule } from '@angular/core';
import { DateTimeRangePickerComponent } from './date-time-range-picker.component';
import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';

@NgModule({
  imports: [],
  declarations: [DateTimeRangePickerComponent, DayComponent, MonthComponent],
  exports: [DateTimeRangePickerComponent, DayComponent, MonthComponent]
})
export class DateTimeRangePickerModule {}
