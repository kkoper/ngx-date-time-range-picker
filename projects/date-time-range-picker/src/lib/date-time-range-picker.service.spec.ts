import { TestBed, inject } from '@angular/core/testing';

import { DateTimeRangePickerService } from './date-time-range-picker.service';

describe('DateTimeRangePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeRangePickerService]
    });
  });

  it('should be created', inject([DateTimeRangePickerService], (service: DateTimeRangePickerService) => {
    expect(service).toBeTruthy();
  }));
});
