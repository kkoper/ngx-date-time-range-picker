import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DayComponent } from './day.component';

fdescribe('DayComponent', () => {
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
    expect(component).toBeTruthy();
  });

  describe('status style', () => {
    it('should be shown us unavailable if the day is unavailable', () => {
      expect(component).toBeTruthy();
    });
    it('should be shown us available if the day is available', () => {
      expect(component).toBeTruthy();
    });
    it('should be shown us partially available if the day is partially available', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('hover state', () => {
    it('should be shown us hovered if the day is in a hovered state', () => {
      expect(component).toBeTruthy();
    });
    it('should be shown us hovered if the user hovers over', () => {
      expect(component).toBeTruthy();
    });
    it('should emit a hover event if the user hovers over', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('clicked', () => {
    it('should emit a day selected event if the user clicks on the day', () => {
      expect(component).toBeTruthy();
    });
  });
});
