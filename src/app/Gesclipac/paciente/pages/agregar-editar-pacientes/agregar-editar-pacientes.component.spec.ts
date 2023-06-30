import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPacientesComponent } from './agregar-editar-pacientes.component';

describe('AgregarEditarPacientesComponent', () => {
  let component: AgregarEditarPacientesComponent;
  let fixture: ComponentFixture<AgregarEditarPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
