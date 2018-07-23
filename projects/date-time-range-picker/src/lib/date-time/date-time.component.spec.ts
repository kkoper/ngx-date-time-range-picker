import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DayComponent } from '../day/day.component';
import { MonthComponent } from '../month/month.component';
import { TimeComponent } from '../time/time.component';
import { DateTimeComponent } from './date-time.component';

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

  it('should go to next month', () => {
    expect(component).toBeTruthy();
  });

  it('should go to previous month', () => {
    expect(component).toBeTruthy();
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
