import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import * as moment_ from 'moment';
import { of } from 'rxjs';
import { DateTimeRangePickerComponent } from './date-time-range-picker.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { TimeComponent } from './time/time.component';
import { DTRPTranslationService } from './translation.service';
const moment = moment_;

describe('DateTimeRangePickerComponent', () => {
  let component: DateTimeRangePickerComponent;
  let fixture: ComponentFixture<DateTimeRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [DTRPTranslationService],
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
    component.getMonthUnavailability = () => of([]);
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
    it('should open the end time component when the startDateTime has been picked and there is no end time selected', () => {
      expect(component.openEnd).toBe(false);

      const startDate = new Date(2019, 1, 1, 1, 30);
      component.onDateTimeFromSelected(startDate);

      expect(component.openEnd).toBe(true);
    });

    it('should close the end time component when the endDateTime has been picked', () => {
      component.onDateTimeUntilSelected(new Date(2019, 1, 1, 1, 30));

      expect(component.openEnd).toBe(false);
    });
  });

  it('should emit when the start date has been updated and there is a valid end date selected', () => {
    const startDate = new Date(2019, 1, 1, 1, 30);
    const endDate = new Date(2019, 1, 1, 2, 30);
    const updatedStartDate = new Date(2019, 1, 1, 1, 0);

    const emitionSpy = spyOn(component.dateTimeRangeSelected, 'emit');

    component.onDateTimeFromSelected(startDate);
    component.onDateTimeUntilSelected(endDate);
    expect(component.dateTimeRangeSelected.emit).toHaveBeenCalledWith({
      start: startDate,
      end: endDate
    });
    emitionSpy.calls.reset();

    component.onDateTimeFromSelected(updatedStartDate);
    expect(component.dateTimeRangeSelected.emit).toHaveBeenCalledWith({
      start: updatedStartDate,
      end: endDate
    });
  });

  it('should not emit when the start date has been updated and the end date is before start date', () => {
    const startDate = new Date(2019, 1, 1, 1, 30);
    const endDate = new Date(2019, 1, 1, 2, 30);
    const updatedStartDate = new Date(2019, 1, 1, 5, 0);

    spyOn(component.dateTimeRangeSelected, 'emit');

    component.onDateTimeFromSelected(startDate);
    component.onDateTimeUntilSelected(endDate);

    component.onDateTimeFromSelected(updatedStartDate);
    expect(component.dateTimeRangeSelected.emit).not.toHaveBeenCalledWith();
    expect(component.selectedEnd).toBeNull();
  });

  it('should not emit when the start date has been selected and there is no end date', () => {
    const startDate = new Date(2019, 1, 1, 1, 30);

    spyOn(component.dateTimeRangeSelected, 'emit');

    component.onDateTimeFromSelected(startDate);

    expect(component.dateTimeRangeSelected.emit).not.toHaveBeenCalledWith();
  });

  it('should emit when the end date has been updated and there is a start date', () => {
    const startDate = new Date(2019, 1, 1, 1, 30);
    const endDate = new Date(2019, 1, 1, 2, 30);
    const updatedEndDate = new Date(2019, 1, 1, 5);

    const emitionSpy = spyOn(component.dateTimeRangeSelected, 'emit');

    component.onDateTimeFromSelected(startDate);
    component.onDateTimeUntilSelected(endDate);
    expect(component.dateTimeRangeSelected.emit).toHaveBeenCalledWith({
      start: startDate,
      end: endDate
    });
    emitionSpy.calls.reset();

    component.onDateTimeUntilSelected(updatedEndDate);
    expect(component.dateTimeRangeSelected.emit).toHaveBeenCalledWith({
      start: startDate,
      end: updatedEndDate
    });
  });

  it('should not emit when the end date has been updated but the start date is after the end date', () => {
    const startDate = new Date(2019, 1, 1, 1, 30);
    const endDate = new Date(2019, 1, 1, 2, 30);
    const updatedEndDate = new Date(2019, 1, 1, 1);

    spyOn(component.dateTimeRangeSelected, 'emit');

    component.onDateTimeFromSelected(startDate);
    component.onDateTimeUntilSelected(endDate);

    component.onDateTimeUntilSelected(updatedEndDate);
    expect(component.dateTimeRangeSelected.emit).not.toHaveBeenCalledWith();
    expect(component.selectedStart).toBeNull();
  });

  it('should not emit when the end date has been selected but there is no start date', () => {
    const endDate = new Date(2019, 1, 1, 2, 30);
    component.selectedStart = null;
    spyOn(component.dateTimeRangeSelected, 'emit');

    component.onDateTimeUntilSelected(endDate);

    expect(component.dateTimeRangeSelected.emit).not.toHaveBeenCalledWith();
    expect(component.selectedStart).toBeNull();
  });

  it('should update the start month availability when the start month is changed', () => {
    expect(component.startMonthUnavailability).toEqual([]);
    const unavailabilityToReturn = {
      start: new Date(2019, 0, 14, 10, 0),
      end: new Date(2019, 0, 14, 21, 0)
    };
    component.getMonthUnavailability = () => of([unavailabilityToReturn]);

    component.onStartMonthChanged(new Date(2019, 1, 1));

    expect(component.startMonthUnavailability).toEqual([unavailabilityToReturn]);
  });

  it('should update the end month availability when the end month is changed', () => {
    expect(component.endMonthUnavailability).toEqual([]);
    const unavailabilityToReturn = {
      start: new Date(2019, 0, 14, 10, 0),
      end: new Date(2019, 0, 14, 21, 0)
    };
    spyOn(component, 'getMonthUnavailability').and.returnValue(of([unavailabilityToReturn]));

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
      component.getMonthUnavailability = () => of([unavailabilityToReturn]);

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
      component.getMonthUnavailability = () => of([unavailabilityToReturn]);

      component.onDateTimeFromSelected(new Date(2019, 0, 4));
      component.onEndMonthChanged(new Date(2019, 1, 4));
      expect(component.endMonthUnavailability).toEqual([expectedEndMonthUnavailabilty]);
    });
  });
});
