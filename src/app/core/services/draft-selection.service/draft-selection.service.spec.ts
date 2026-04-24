import { TestBed } from '@angular/core/testing';

import { DraftSelectionService } from '@core/services';

describe('DraftSelectionService', () => {
  let service: DraftSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
