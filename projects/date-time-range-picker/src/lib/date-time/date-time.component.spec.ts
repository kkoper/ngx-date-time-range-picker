import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as moment_ from 'moment';
import { DayComponent } from '../day/day.component';
import { DateTimeRange } from '../models/date-time-range';
import { MonthComponent } from '../month/month.component';
import { TimeComponent } from '../time/time.component';
import { DateTimeComponent } from './date-time.component';
const moment = moment_;

describe('DateTimeComponent', () => {
  let component: DateTimeComponent;
  let fixture: ComponentFixture<DateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DateTimeComponent, MonthComponent, DayComponent, TimeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a month', () => {
    const monthElement = fixture.debugElement.queryAll(By.css('ngx-month'));

    expect(monthElement.length).toBe(1);
  });

  it('should show a time', () => {
    const timeComponent = fixture.debugElement.queryAll(By.css('ngx-time'));

    expect(timeComponent.length).toBe(1);
  });

  it('should have the current year and month as a default selection', () => {
    const currentYear = moment().year();
    const currentMonth = moment().month();

    expect(component.year).toBe(currentYear);
    expect(component.currentMonth).toBe(currentMonth);
  });

  it('should show the current month and year', () => {
    const currentYear = moment().year();
    const currentMonth = moment().format('MMMM');
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(currentYear);
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(currentMonth);
  });

  it('should go to previous month', () => {
    const previousMonth = moment()
      .subtract(1, 'months')
      .month();
    const previousYear = moment()
      .subtract(1, 'months')
      .year();
    const previousMonthButton = fixture.debugElement.queryAll(By.css('.btn-previous-month'));
    expect(previousMonthButton.length).toBe(1);

    previousMonthButton[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.currentMonth).toBe(previousMonth);
    expect(component.year).toBe(previousYear);
  });

  it('should go to next month', () => {
    const nextMonth = moment()
      .add(1, 'months')
      .month();
    const nextYear = moment()
      .add(1, 'months')
      .year();
    const nextMonthButton = fixture.debugElement.queryAll(By.css('.btn-next-month'));
    expect(nextMonthButton.length).toBe(1);

    nextMonthButton[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.currentMonth).toBe(nextMonth);
    expect(component.year).toBe(nextYear);
  });

  it('should give time unavailabilities when a day-month is picked', () => {
    const unavailability: DateTimeRange[] = [
      { start: new Date(2019, 11, 14, 10, 0), end: new Date(2019, 11, 14, 21, 0) },
      { start: new Date(2019, 11, 16, 10, 0), end: new Date(2019, 11, 18, 18, 0) },
      { start: new Date(2019, 11, 18, 10, 0), end: new Date(2019, 11, 21, 21, 0) },
      { start: new Date(2019, 11, 25, 10, 0), end: new Date(2019, 11, 26, 11, 0) },
      { start: new Date(2019, 11, 26, 16, 0), end: new Date(2019, 11, 26, 18, 0) },
      { start: new Date(2019, 11, 26, 23, 0), end: new Date(2019, 11, 27, 11, 0) }
    ];
    const expectedTimeUnavailability: DateTimeRange[] = [
      { start: new Date(2019, 11, 25, 10, 0), end: new Date(2019, 11, 26, 11, 0) },
      { start: new Date(2019, 11, 26, 16, 0), end: new Date(2019, 11, 26, 18, 0) },
      { start: new Date(2019, 11, 26, 23, 0), end: new Date(2019, 11, 27, 11, 0) }
    ];
    component.monthUnavailabilities = unavailability;
    component.ngOnInit();
    fixture.detectChanges();

    component.onDayMonthSelected(new Date(2019, 11, 26));

    expect(component.timeUnavailabilities).toEqual(expectedTimeUnavailability);
  });

  it('should emit a date-time when a time is picked', done => {
    spyOn(component.dateTimeSelected, 'emit').and.callThrough();
    component.dateTimeSelected.subscribe((selectedDate: Date) => {
      expect(selectedDate).toEqual(new Date(2019, 11, 26, 20, 10));
      done();
    });

    component.onDayMonthSelected(
      moment()
        .year(2019)
        .month(11)
        .date(26)
        .startOf('day')
        .toDate()
    );
    component.onTimeSelected({ hours: 20, minutes: 10 });
  });
});
