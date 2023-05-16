import { TestBed } from '@angular/core/testing';

import { InformatiiService } from './informatii.service';

describe('InformatiiService', () => {
  let service: InformatiiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformatiiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
