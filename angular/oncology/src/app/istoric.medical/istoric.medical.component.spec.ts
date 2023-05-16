import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstoricMedicalComponent } from './istoric.medical.component';

describe('IstoricMedicalComponent', () => {
  let component: IstoricMedicalComponent;
  let fixture: ComponentFixture<IstoricMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstoricMedicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstoricMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
