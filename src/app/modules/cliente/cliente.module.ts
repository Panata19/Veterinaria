import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarEditarClientesComponent } from './pages/agregar-editar-clientes/agregar-editar-clientes.component';
import { ListadoCliComponent } from './pages/listado-cli/listado-cli.component';

import { MaterialModule } from '../material/material.module';
import { ClienteRoutingModule } from './cliente-routing.module';

import { ConfirmacionComponent } from './pages/verificacion/confirmacion/confirmacion.component';
import { ClienteregistradoComponent } from './pages/verificacion/Clienteregistrado/clienteregistrado.component';



@NgModule({
  declarations: [
    AgregarEditarClientesComponent,
    ListadoCliComponent,  
    ConfirmacionComponent, 
    ClienteregistradoComponent

  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule
    
  ]
})
export class ClienteModule { }
