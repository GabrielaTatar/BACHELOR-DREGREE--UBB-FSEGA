import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPacientiComponent } from './lista-pacienti.component';

describe('ListaPacientiComponent', () => {
  let component: ListaPacientiComponent;
  let fixture: ComponentFixture<ListaPacientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPacientiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPacientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
