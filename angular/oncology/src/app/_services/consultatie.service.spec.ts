import { TestBed } from '@angular/core/testing';

import { ConsultatieService } from './consultatie.service';

describe('ConsultatieService', () => {
  let service: ConsultatieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultatieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
