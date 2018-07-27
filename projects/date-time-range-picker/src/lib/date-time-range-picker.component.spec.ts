import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import * as moment_ from 'moment';
import { DateTimeRangePickerComponent } from './date-time-range-picker.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { DayComponent } from './day/day.component';
import { DateTimeRange } from './models/date-time-range';
import { MonthComponent } from './month/month.component';
import { TimeComponent } from './time/time.component';
const moment = moment_;

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
    component.getMonthUnavailability = () => [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to current date for start and end date', () => {
    const currentDate = moment();
    const startDate = moment(component.selectedStart);
    const endDate = moment(component.selectedEnd);

    expect(currentDate.isSame(startDate, 'day')).toBe(true);
    expect(currentDate.isSame(endDate, 'day')).toBe(true);
  });

  describe('flow', () => {
    it('should open the end time component when the startDateTime has been picked', () => {
      expect(component.openEnd).toBe(false);

      component.onDateTimeFromSelected(new Date(2019, 1, 1, 1, 30));

      expect(component.openEnd).toBe(true);
    });

    it('should close the end time component when the endDateTime has been picked', () => {
      component.onDateTimeUntilSelected(new Date(2019, 1, 1, 1, 30));

      expect(component.openEnd).toBe(false);
    });
  });

  it('should emit when the full range has been picked', done => {
    const startDate = new Date(2019, 1, 1, 1, 30);
    const endDate = new Date(2019, 1, 1, 2, 30);

    component.dateTimeRangeSelected.subscribe((range: DateTimeRange) => {
      expect(range).toEqual({ start: startDate, end: endDate });
      done();
    });

    component.onDateTimeFromSelected(startDate);
    component.onDateTimeUntilSelected(endDate);
  });

  it('should update the start month availability when the start month is changed', () => {
    expect(component.startMonthUnavailability).toEqual([]);
    const unavailabilityToReturn = {
      start: new Date(2019, 0, 14, 10, 0),
      end: new Date(2019, 0, 14, 21, 0)
    };
    component.getMonthUnavailability = () => [unavailabilityToReturn];

    component.onStartMonthChanged(new Date(2019, 1, 1));

    expect(component.startMonthUnavailability).toEqual([unavailabilityToReturn]);
  });

  it('should update the end month availability when the end month is changed', () => {
    expect(component.endMonthUnavailability).toEqual([]);
    const unavailabilityToReturn = {
      start: new Date(2019, 0, 14, 10, 0),
      end: new Date(2019, 0, 14, 21, 0)
    };
    spyOn(component, 'getMonthUnavailability').and.returnValue([unavailabilityToReturn]);

    component.onEndMonthChanged(new Date(2019, 1, 1));

    expect(component.getMonthUnavailability).toHaveBeenCalled();
  });

  describe('block availability when startDateTime is selected', () => {
    beforeEach(() => {});

    it('should set the end month as unavailable from the next block', () => {
      const unavailabilityToReturn = {
        start: new Date(2019, 0, 14, 10, 0),
        end: new Date(2019, 0, 14, 21, 0)
      };
      const expectedEndMonthUnavailabilty = {
        start: new Date(2019, 0, 14, 10, 0),
        end: new Date(2019, 0, 31, 23, 59, 59, 999)
      };
      component.getMonthUnavailability = () => [unavailabilityToReturn];

      component.onDateTimeFromSelected(new Date(2019, 0, 4));
      expect(component.endMonthUnavailability).toEqual([expectedEndMonthUnavailabilty]);
    });

    it('should set the end month as fully unavailable if there is a block between start and the end month', () => {
      const unavailabilityToReturn = {
        start: new Date(2019, 0, 14, 10, 0),
        end: new Date(2019, 0, 14, 21, 0)
      };
      const expectedEndMonthUnavailabilty = {
        start: new Date(2019, 1, 1, 0, 0),
        end: new Date(2019, 1, 28, 23, 59, 59, 999)
      };
      component.getMonthUnavailability = () => [unavailabilityToReturn];

      component.onDateTimeFromSelected(new Date(2019, 0, 4));
      component.onEndMonthChanged(new Date(2019, 1, 4));
      expect(component.endMonthUnavailability).toEqual([expectedEndMonthUnavailabilty]);
    });
  });
});
