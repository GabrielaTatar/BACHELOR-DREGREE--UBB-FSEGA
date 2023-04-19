import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HematooncologComponent } from './hematooncolog.component';

describe('HematooncologComponent', () => {
  let component: HematooncologComponent;
  let fixture: ComponentFixture<HematooncologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HematooncologComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HematooncologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
