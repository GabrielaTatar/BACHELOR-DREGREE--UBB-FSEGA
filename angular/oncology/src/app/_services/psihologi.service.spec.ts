import { TestBed } from '@angular/core/testing';

import { PsihologiService } from './psihologi.service';

describe('PsihologiService', () => {
  let service: PsihologiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsihologiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
