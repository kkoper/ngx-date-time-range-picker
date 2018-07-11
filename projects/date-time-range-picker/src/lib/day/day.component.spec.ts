import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '../../../../../node_modules/@angular/platform-browser';
import { DayState } from '../models/day-state';
import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DayComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a value for the day', () => {
    const valueToShow = 31;
    component.value = 31;

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.day-block')).nativeElement;
    expect(element.innerHTML).toContain(valueToShow);
  });

  describe('status style', () => {
    beforeEach(() => {
      component.value = 31;
    });

    it('should be shown as unavailable if the day is full', () => {
      component.status = DayState.Full;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.day-block')).nativeElement;
      expect(element.classList.contains('partial')).toBe(false);
      expect(element.classList.contains('unavailable')).toBe(true);
      expect(element.classList.contains('available')).toBe(false);
    });
    it('should be shown as available if the day is free', () => {
      component.status = DayState.Free;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.day-block')).nativeElement;
      expect(element.classList.contains('partial')).toBe(false);
      expect(element.classList.contains('unavailable')).toBe(false);
      expect(element.classList.contains('available')).toBe(true);
    });
    it('should be shown as partially available if the day is partially available', () => {
      component.status = DayState.Partial;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.day-block')).nativeElement;
      expect(element.classList.contains('partial')).toBe(true);
      expect(element.classList.contains('unavailable')).toBe(false);
      expect(element.classList.contains('available')).toBe(false);
    });
  });

  describe('hover state', () => {
    it('should not be shown as hovered if the day is not hovered', () => {
      component.hovered = false;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.day-block')).nativeElement;
      expect(element.classList.contains('hover')).toBe(false);
    });
    it('should be shown as hovered if the day is in a hovered state', () => {
      component.hovered = true;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.day-block')).nativeElement;
      expect(element.classList.contains('hover')).toBe(true);
    });
    it('should be shown as hovered if the user hovers in', () => {
      component.hovered = false;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.day-block'));
      element.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();

      expect(element.nativeElement.classList.contains('hover')).toBe(true);
    });
    it('should not be shown as hovered if the user hovers out', () => {
      component.hovered = true;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.day-block'));
      element.triggerEventHandler('mouseleave', null);
      fixture.detectChanges();

      expect(element.nativeElement.classList.contains('hover')).toBe(false);
    });
    it('should emit a hover event if the user hovers over', () => {
      component.hovered = false;
      spyOn(component.hoverDay, 'emit');
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.day-block'));
      element.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();

      expect(component.hoverDay.emit).toHaveBeenCalled();
    });
  });

  describe('clicked', () => {
    it('should emit a day selected event if the user clicks on the day', () => {
      const dayNumber = 31;
      component.value = dayNumber;
      spyOn(component.selectDay, 'emit').and.callThrough();
      fixture.detectChanges();

      component.selectDay.subscribe((selectedDay: number) => {
        expect(selectedDay).toBe(dayNumber);
      });
      const element = fixture.debugElement.query(By.css('.day-block'));
      element.triggerEventHandler('click', null);

      expect(component.selectDay.emit).toHaveBeenCalled();
    });
  });
});
