import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCiComponent } from './pages/listado-ci/listado-ci.component';
import { AgregarEditarCitasComponent } from './pages/agregar-editar-citas/agregar-editar-citas.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',    
    children: [
      {
        path: 'listado',
        component: ListadoCiComponent
      },
      {
        path: 'agregar',
        component: AgregarEditarCitasComponent

      },
      {
        path: 'editar/:id',
        component: AgregarEditarCitasComponent

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
export class CitasRoutingModule { }
