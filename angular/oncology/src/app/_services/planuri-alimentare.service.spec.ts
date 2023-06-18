import { TestBed } from '@angular/core/testing';

import { PlanuriAlimentareService } from './planuri-alimentare.service';

describe('PlanuriAlimentareService', () => {
  let service: PlanuriAlimentareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanuriAlimentareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
