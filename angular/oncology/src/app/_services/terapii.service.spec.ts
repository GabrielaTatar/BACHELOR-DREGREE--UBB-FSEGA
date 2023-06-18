import { TestBed } from '@angular/core/testing';

import { TerapiiService } from './terapii.service';

describe('TerapiiService', () => {
  let service: TerapiiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerapiiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
