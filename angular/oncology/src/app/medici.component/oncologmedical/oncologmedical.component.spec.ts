import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OncologmedicalComponent } from './oncologmedical.component';

describe('OncologmedicalComponent', () => {
  let component: OncologmedicalComponent;
  let fixture: ComponentFixture<OncologmedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OncologmedicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OncologmedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
