import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPacComponent } from './pages/listado-pac/listado-pac.component';
import { AgregarEditarPacientesComponent } from './pages/agregar-editar-pacientes/agregar-editar-pacientes.component';
import { PacienteRoutingModule } from './paciente-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ConfirmacionComponent } from './pages/Verificacion/confirmacion/confirmacion.component';



@NgModule({
  declarations: [
   
    ListadoPacComponent,
    AgregarEditarPacientesComponent,
    ConfirmacionComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    MaterialModule
    
  ]
})
export class PacienteModule { }
