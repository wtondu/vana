import { TestBed } from '@angular/core/testing';

import { HandicapService } from './handicap.service';

describe('HandicapService', () => {
  let service: HandicapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandicapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
