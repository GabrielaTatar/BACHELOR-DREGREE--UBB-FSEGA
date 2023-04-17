import { TestBed } from '@angular/core/testing';

import { MediciService } from './medici.service';

describe('MediciService', () => {
  let service: MediciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
