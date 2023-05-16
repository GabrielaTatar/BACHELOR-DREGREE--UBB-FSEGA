import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugareConsultatiePsihologComponent } from './adaugare.consultatie.psiholog.component';

describe('AdaugareConsultatiePsihologComponent', () => {
  let component: AdaugareConsultatiePsihologComponent;
  let fixture: ComponentFixture<AdaugareConsultatiePsihologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaugareConsultatiePsihologComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaugareConsultatiePsihologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
