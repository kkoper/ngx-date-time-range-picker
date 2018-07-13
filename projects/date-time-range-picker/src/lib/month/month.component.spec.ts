import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DayComponent } from '../day/day.component';
import { DateTimeRange } from '../models/date-time-range';
import { MonthComponent } from './month.component';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [MonthComponent, DayComponent]
    })
      .overrideComponent(MonthComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    const unavailabilityToUse: DateTimeRange[] = [
      { start: new Date(2018, 6, 1), end: new Date(2018, 6, 10) }
    ];
    component.unavailability = unavailabilityToUse;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('render', () => {
    it('should show the correct amount of days', () => {
      const monthToUse = 6;
      const yearToUse = 2018;
      const expectedMonthDays = 31;
      component.month = monthToUse;
      component.year = yearToUse;
      fixture.detectChanges();

      const monthDays = fixture.debugElement.queryAll(By.css('.month-day'));

      expect(monthDays.length).toBe(expectedMonthDays);
    });
  });

  it('should have the correct number of dummy days before', () => {
    const monthToUse = 6;
    const yearToUse = 2018;
    const expectedDaysBefore = 6;
    component.month = monthToUse;
    component.year = yearToUse;
    fixture.detectChanges();

    const daysBefore = fixture.debugElement.queryAll(By.css('.day-before'));

    expect(daysBefore.length).toBe(expectedDaysBefore);
  });

  it('should have the correct number of dummy days after', () => {
    const monthToUse = 6;
    const yearToUse = 2018;
    const expectedDaysAfter = 5;
    component.month = monthToUse;
    component.year = yearToUse;
    fixture.detectChanges();

    const daysBefore = fixture.debugElement.queryAll(By.css('.day-after'));

    expect(daysBefore.length).toBe(expectedDaysAfter);
  });

  it('should know when a day is hovered', () => {
    const monthToUse = 6;
    const yearToUse = 2020;
    const hoverToUse = new Date(2020, 6, 4);
    component.month = monthToUse;
    component.year = yearToUse;
    component.hoverFrom = hoverToUse;
    component.unavailability = [];
    fixture.detectChanges();

    component.dayHovered(10);
    fixture.detectChanges();

    const daysHovered = fixture.debugElement.queryAll(By.css('.hover'));

    expect(daysHovered.length).toBe(7);
  });

  it('should know when a day is available', () => {
    const monthToUse = 6;
    const yearToUse = 2020;
    const hoverToUse = new Date(2020, 6, 4);
    const unavailabilityToUse: DateTimeRange[] = [
      {
        start: new Date(2020, 6, 1),
        end: new Date(2020, 6, 10)
      }
    ];
    component.month = monthToUse;
    component.year = yearToUse;
    component.hoverFrom = hoverToUse;
    component.unavailability = unavailabilityToUse;
    fixture.detectChanges();

    const daysAvailable = fixture.debugElement.queryAll(By.css('.available'));

    expect(daysAvailable.length).toBe(21);
  });

  it('should know when a day is partially available', () => {
    const monthToUse = 6;
    const yearToUse = 2020;
    const hoverToUse = new Date(2020, 6, 4);
    const unavailabilityToUse: DateTimeRange[] = [
      { start: new Date(2020, 6, 1, 10, 0), end: new Date(2020, 6, 1, 15, 0) }
    ];
    component.month = monthToUse;
    component.year = yearToUse;
    component.hoverFrom = hoverToUse;
    component.unavailability = unavailabilityToUse;
    fixture.detectChanges();

    const daysAvailable = fixture.debugElement.queryAll(By.css('.partial'));

    expect(daysAvailable.length).toBe(1);
  });

  it('should know when a day is unavailable', () => {
    const monthToUse = 6;
    const yearToUse = 2020;
    const hoverToUse = new Date(2018, 6, 4);
    const unavailabilityToUse: DateTimeRange[] = [
      { start: new Date(2020, 6, 1, 14, 0), end: new Date(2020, 6, 10, 21, 0) }
    ];
    component.month = monthToUse;
    component.year = yearToUse;
    component.hoverFrom = hoverToUse;
    component.unavailability = unavailabilityToUse;
    fixture.detectChanges();

    const daysUnavailable = fixture.debugElement.queryAll(By.css('.unavailable'));

    expect(daysUnavailable.length).toBe(8);
  });

  it('should emit a date selected event when a day is selected', () => {
    const monthToUse = 8;
    const yearToUse = 2018;
    const dayToSelect = 12;
    const unavailabilityToUse: DateTimeRange[] = [
      { start: new Date(2018, 8, 1, 14, 0), end: new Date(2018, 8, 10, 21, 0) }
    ];
    component.month = monthToUse;
    component.year = yearToUse;
    component.unavailability = unavailabilityToUse;
    fixture.detectChanges();

    spyOn(component.dateSelected, 'emit').and.callThrough();
    component.dateSelected.subscribe((selectedDate: Date) => {
      expect(selectedDate).toEqual(new Date(yearToUse, monthToUse, dayToSelect));
    });

    component.daySelected(dayToSelect);
    expect(component.dateSelected.emit).toHaveBeenCalled();
  });
});
