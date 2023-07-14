import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoUsuariosComponent } from './usuario/pages/listado-usuarios/listado-usuarios.component';
import { RegistroUsuarioComponent } from './usuario/components/modals/registro-usuario/registro-usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { TableComponent } from './usuario/components/table/table/table.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistroUsuarioComponent,
    ListadoUsuariosComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
