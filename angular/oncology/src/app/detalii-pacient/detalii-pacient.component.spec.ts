import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaliiPacientComponent } from './detalii-pacient.component';

describe('DetaliiPacientComponent', () => {
  let component: DetaliiPacientComponent;
  let fixture: ComponentFixture<DetaliiPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaliiPacientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaliiPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
