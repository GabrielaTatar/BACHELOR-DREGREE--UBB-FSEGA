import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramarileMeleComponent } from './programarile.mele.component';

describe('ProgramarileMeleComponent', () => {
  let component: ProgramarileMeleComponent;
  let fixture: ComponentFixture<ProgramarileMeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramarileMeleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramarileMeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
