import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ListadoCliComponent } from './pages/listado-cli/listado-cli.component';
import { AgregarEditarClientesComponent } from './pages/agregar-editar-clientes/agregar-editar-clientes.component';

const routes: Routes = [
  {
    path: '',    
    children: [
      {
        path: 'listado',
        component: ListadoCliComponent
      },
      {
        path: 'agregar',
        component: AgregarEditarClientesComponent

      },
      {
        path: 'editar/:id',
        component: AgregarEditarClientesComponent
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
export class ClienteRoutingModule { }
