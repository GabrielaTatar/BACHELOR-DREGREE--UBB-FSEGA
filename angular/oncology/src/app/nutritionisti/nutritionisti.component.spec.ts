import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistiComponent } from './nutritionisti.component';

describe('NutritionistiComponent', () => {
  let component: NutritionistiComponent;
  let fixture: ComponentFixture<NutritionistiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionistiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionistiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
