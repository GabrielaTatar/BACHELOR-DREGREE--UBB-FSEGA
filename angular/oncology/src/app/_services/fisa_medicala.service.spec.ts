import { TestBed } from '@angular/core/testing';

import { FisaMedicalaService } from './fisa_medicala.service';

describe('HomeService', () => {
  let service: FisaMedicalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FisaMedicalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
