import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamenteComponent } from './tratamente.component';

describe('TratamenteComponent', () => {
  let component: TratamenteComponent;
  let fixture: ComponentFixture<TratamenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
