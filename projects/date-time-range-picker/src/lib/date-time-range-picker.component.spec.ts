import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DateTimeRangePickerComponent } from './date-time-range-picker.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { TimeComponent } from './time/time.component';

describe('DateTimeRangePickerComponent', () => {
  let component: DateTimeRangePickerComponent;
  let fixture: ComponentFixture<DateTimeRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        DateTimeComponent,
        MonthComponent,
        DayComponent,
        TimeComponent,
        DateTimeRangePickerComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
