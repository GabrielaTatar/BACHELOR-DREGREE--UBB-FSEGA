import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugareConsultatieComponent } from './adaugare.consultatie.component';

describe('AdaugareConsultatieComponent', () => {
  let component: AdaugareConsultatieComponent;
  let fixture: ComponentFixture<AdaugareConsultatieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaugareConsultatieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaugareConsultatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
