import { TestBed } from '@angular/core/testing';

import { NutritionistiService} from './nutritionisti.service';

describe('NutritionistiService', () => {
  let service: NutritionistiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionistiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
