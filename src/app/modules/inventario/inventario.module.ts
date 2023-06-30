import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoComponent } from './producto/pages/main/producto.component';
import { BodegaComponent } from './bodega/pages/main/bodega.component';
import { SuministrosComponent } from './suministros/pages/main/suministros.component';

import { InventarioRoutingModule } from './inventario-routing.module';
import { TemplateComponent } from './template/template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ProductoComponent,
    BodegaComponent,
    SuministrosComponent,
    TemplateComponent
],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class InventarioModule { }
