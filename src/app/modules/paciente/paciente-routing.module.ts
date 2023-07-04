import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPacComponent } from './pages/listado-pac/listado-pac.component';
import { AgregarEditarPacientesComponent } from './pages/agregar-editar-pacientes/agregar-editar-pacientes.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',   
    
    children: [
      {
        path: 'listado',
        component: ListadoPacComponent
      },
      {
        path: 'agregar',
        component: AgregarEditarPacientesComponent

      },
      {
        path: 'editar/:id',
        component: AgregarEditarPacientesComponent

      },       
      {
        path: '**',
        redirectTo: 'listado'
      }

    ]
  }

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class PacienteRoutingModule { }
