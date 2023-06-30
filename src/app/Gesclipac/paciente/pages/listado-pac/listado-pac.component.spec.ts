import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPacComponent } from './listado-pac.component';

describe('ListadoPacComponent', () => {
  let component: ListadoPacComponent;
  let fixture: ComponentFixture<ListadoPacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
