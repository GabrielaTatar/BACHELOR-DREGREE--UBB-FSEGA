import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugareConsultatieNutritionistComponent } from './adaugare.consultatie.nutritionist.component';

describe('AdaugareConsultatieNutritionistComponent', () => {
  let component: AdaugareConsultatieNutritionistComponent;
  let fixture: ComponentFixture<AdaugareConsultatieNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaugareConsultatieNutritionistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaugareConsultatieNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
