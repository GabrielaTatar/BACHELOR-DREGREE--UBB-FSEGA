import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediciComponent } from './medici.component';

describe('MediciComponent', () => {
  let component: MediciComponent;
  let fixture: ComponentFixture<MediciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
