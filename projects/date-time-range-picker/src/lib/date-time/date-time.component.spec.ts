import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as moment_ from 'moment';
import { DayComponent } from '../day/day.component';
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

  it('should go to next month', () => {
    expect(component).toBeTruthy();
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

  it('should give month unavailabilities', () => {
    expect(component).toBeTruthy();
  });

  it('should give time unavailabilities when a day-month is picked', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a date-time when a time is picked', () => {
    expect(component).toBeTruthy();
  });

  it('should pass along if there is a day selected for the start of the period', () => {
    expect(component).toBeTruthy();
  });
});
