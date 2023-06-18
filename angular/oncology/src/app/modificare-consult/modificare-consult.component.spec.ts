import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificareConsultComponent } from './modificare-consult.component';

describe('ModificareConsultComponent', () => {
  let component: ModificareConsultComponent;
  let fixture: ComponentFixture<ModificareConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificareConsultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificareConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
