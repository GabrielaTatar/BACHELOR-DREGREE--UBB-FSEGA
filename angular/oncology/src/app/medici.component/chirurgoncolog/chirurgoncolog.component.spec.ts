import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirurgoncologComponent } from './chirurgoncolog.component';

describe('ChirurgoncologComponent', () => {
  let component: ChirurgoncologComponent;
  let fixture: ComponentFixture<ChirurgoncologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChirurgoncologComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirurgoncologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
