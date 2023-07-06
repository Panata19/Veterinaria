import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionComponent } from './facturacion/pages/main/facturacion.component';
import { FacturacionRoutingModule } from './facturacion-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    FacturacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FacturacionRoutingModule,
    SharedModule,
    MaterialModule,
    PipesModule
  ]
})
export class TiendaModule { }
