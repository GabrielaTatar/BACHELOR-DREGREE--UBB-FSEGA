import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanuriAlimentareComponent } from './planuri.alimentare.component';

describe('PlanuriAlimentareComponent', () => {
  let component: PlanuriAlimentareComponent;
  let fixture: ComponentFixture<PlanuriAlimentareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanuriAlimentareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanuriAlimentareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
