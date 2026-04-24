import { TestBed } from '@angular/core/testing';

import { ProtectionService } from '@core/services';

describe('ProtectionService', () => {
  let service: ProtectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
