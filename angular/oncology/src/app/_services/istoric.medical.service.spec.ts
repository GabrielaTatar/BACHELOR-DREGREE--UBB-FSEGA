import { TestBed } from '@angular/core/testing';

import { IstoricMedicalService } from './istoric.medical.service';

describe('IstoricMedicalService', () => {
  let service: IstoricMedicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IstoricMedicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
