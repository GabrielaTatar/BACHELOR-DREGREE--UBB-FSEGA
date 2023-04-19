import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OncologradioterapeutComponent } from './oncologradioterapeut.component';

describe('OncologradioterapeutComponent', () => {
  let component: OncologradioterapeutComponent;
  let fixture: ComponentFixture<OncologradioterapeutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OncologradioterapeutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OncologradioterapeutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
