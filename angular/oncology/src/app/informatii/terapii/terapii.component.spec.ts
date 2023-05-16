import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapiiComponent } from './terapii.component';

describe('TerapiiComponent', () => {
  let component: TerapiiComponent;
  let fixture: ComponentFixture<TerapiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerapiiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerapiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
