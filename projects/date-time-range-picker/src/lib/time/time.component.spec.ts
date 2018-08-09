import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TimeComponent, TimeSegment } from './time.component';

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [TimeComponent]
    })
      .overrideComponent(TimeComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
    component.selectedDate = new Date(2018, 6, 26);
    component.unavailabilities = [
      { start: new Date(2018, 6, 25, 10, 0), end: new Date(2018, 6, 26, 11, 0) },
      { start: new Date(2018, 6, 26, 16, 0), end: new Date(2018, 6, 26, 18, 0) },
      { start: new Date(2018, 6, 26, 23, 0), end: new Date(2018, 6, 27, 11, 0) }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all options in a day', () => {
    const options = fixture.debugElement.queryAll(By.css('li.time-list-item'));

    expect(options.length).toBe(48);
  });

  it('should have the correct amount of unavailable options in case of an overlapping start', () => {
    component.selectedDate = new Date(2018, 6, 26);
    component.unavailabilities = [
      { start: new Date(2018, 6, 25, 10, 0), end: new Date(2018, 6, 26, 11, 0) }
    ];

    component.ngOnInit();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('li.time-list-item.disabled'));

    expect(options.length).toBe(23);
  });

  it('should have the correct amount of unavailable options in case of an overlapping end', () => {
    component.selectedDate = new Date(2018, 6, 26);
    component.unavailabilities = [
      { start: new Date(2018, 6, 26, 23, 0), end: new Date(2018, 6, 27, 11, 0) }
    ];

    component.ngOnInit();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('li.time-list-item.disabled'));

    expect(options.length).toBe(2);
  });

  it('should have the correct amount of unavailable options in case of a period within the day', () => {
    component.selectedDate = new Date(2018, 6, 26);
    component.unavailabilities = [
      { start: new Date(2018, 6, 26, 16, 0), end: new Date(2018, 6, 26, 18, 0) }
    ];

    component.ngOnInit();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('li.time-list-item.disabled'));

    expect(options.length).toBe(5);
  });

  it('should emit when a time is selected', () => {
    spyOn(component.timeSelected, 'emit').and.callThrough();

    const timeToSelect = { hour: 23, minute: 30, isBlocked: false };
    component.selectedTimeOption = timeToSelect;

    expect(component.timeSelected.emit).toHaveBeenCalledWith({
      hours: timeToSelect.hour,
      minutes: timeToSelect.minute
    });
  });

  describe('compare function', () => {
    it('should be true if the hour and the minute and the isBlocked are equal', () => {
      const t1: TimeSegment = {
        hour: 23,
        minute: 30,
        isBlocked: false
      };
      const t2: TimeSegment = {
        hour: 23,
        minute: 30,
        isBlocked: false
      };

      expect(component.compareFn(t1, t2)).toBe(true);
    });

    it('should be false if the hour and the minute are equal but the one segment is blocked', () => {
      const t1: TimeSegment = {
        hour: 23,
        minute: 30,
        isBlocked: false
      };
      const t2: TimeSegment = {
        hour: 23,
        minute: 30,
        isBlocked: true
      };

      expect(component.compareFn(t1, t2)).toBe(false);
    });

    it('should be false if the hour is equal but the minute is different', () => {
      const t1: TimeSegment = {
        hour: 23,
        minute: 30,
        isBlocked: false
      };
      const t2: TimeSegment = {
        hour: 23,
        minute: 0,
        isBlocked: true
      };

      expect(component.compareFn(t1, t2)).toBe(false);
    });

    it('should be false if the minute is equal but the hour is different', () => {
      const t1: TimeSegment = { hour: 23, minute: 30, isBlocked: false };
      const t2: TimeSegment = { hour: 21, minute: 30, isBlocked: true };

      expect(component.compareFn(t1, t2)).toBe(false);
    });
  });
});
