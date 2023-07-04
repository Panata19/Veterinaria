import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEditarCitasComponent } from './pages/agregar-editar-citas/agregar-editar-citas.component';
import { ListadoCiComponent } from './pages/listado-ci/listado-ci.component';
import { CitasRoutingModule } from './citas-routing.module';



@NgModule({
  declarations: [
    AgregarEditarCitasComponent,
    ListadoCiComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule
  ]
})
export class CitasModule { }
