import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediconcologComponent } from './mediconcolog.component';

describe('MediconcologComponent', () => {
  let component: MediconcologComponent;
  let fixture: ComponentFixture<MediconcologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediconcologComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediconcologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
