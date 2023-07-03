import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPacComponent } from './pages/listado-pac/listado-pac.component';
import { AgregarEditarPacientesComponent } from './pages/agregar-editar-pacientes/agregar-editar-pacientes.component';
import { PacienteRoutingModule } from './paciente-routing.module';



@NgModule({
  declarations: [
   
    ListadoPacComponent,
    AgregarEditarPacientesComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    
  ]
})
export class PacienteModule { }
