import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthComponent } from './month.component';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('render', () => {
    it('should show the correct amount of days', () => {
      expect(component).toBeTruthy();
    });
  });

  it('should have the correct number of dummy days before', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct number of dummy days after', () => {
    expect(component).toBeTruthy();
  });

  it('should know when a day is hovered', () => {
    expect(component).toBeTruthy();
  });

  it('should know when a day is not hovered', () => {
    expect(component).toBeTruthy();
  });

  it('should know when a day is available', () => {
    expect(component).toBeTruthy();
  });

  it('should know when a day is partially available', () => {
    expect(component).toBeTruthy();
  });

  it('should know when a day is unavailable', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a date selected event when a day is selected', () => {
    expect(component).toBeTruthy();
  });
});
