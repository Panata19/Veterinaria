import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCiComponent } from './listado-ci.component';

describe('ListadoCiComponent', () => {
  let component: ListadoCiComponent;
  let fixture: ComponentFixture<ListadoCiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
