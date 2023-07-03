import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarEditarClientesComponent } from './pages/agregar-editar-clientes/agregar-editar-clientes.component';
import { ListadoCliComponent } from './pages/listado-cli/listado-cli.component';

import { ClienteRoutingModule } from './cliente-routing.module';
import { MaterialModule } from 'src/app/material/material.module';







@NgModule({
  declarations: [
    AgregarEditarClientesComponent,
    ListadoCliComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule   
    
  ]
})
export class ClienteModule { }
