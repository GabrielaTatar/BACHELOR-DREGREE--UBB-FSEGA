import { TestBed } from '@angular/core/testing';

import { PacientiService } from './pacienti.service';

describe('PacientiService', () => {
  let service: PacientiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
