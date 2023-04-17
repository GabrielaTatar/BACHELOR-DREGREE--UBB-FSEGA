import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsihologiComponent } from './psihologi.component';

describe('PsihologiComponent', () => {
  let component: PsihologiComponent;
  let fixture: ComponentFixture<PsihologiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsihologiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsihologiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
