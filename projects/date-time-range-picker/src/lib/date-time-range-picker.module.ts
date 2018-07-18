import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeRangePickerComponent } from './date-time-range-picker.component';
import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { TimeComponent } from './time/time.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DateTimeRangePickerComponent, DayComponent, MonthComponent, TimeComponent],
  exports: [DateTimeRangePickerComponent, DayComponent, MonthComponent, TimeComponent]
})
export class DateTimeRangePickerModule {}
