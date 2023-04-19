import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultatiiComponent } from './consultatii.component';

describe('ConsultatiiComponent', () => {
  let component: ConsultatiiComponent;
  let fixture: ComponentFixture<ConsultatiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultatiiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultatiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
