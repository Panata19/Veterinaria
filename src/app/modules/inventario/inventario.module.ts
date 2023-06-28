import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoComponent } from './producto/producto.component';
import { BodegaComponent } from './bodega/bodega.component';
import { SuministrosComponent } from './suministros/suministros.component';

import { InventarioRoutingModule } from './inventario-routing.module';



@NgModule({
  declarations: [
    ProductoComponent,
    BodegaComponent,
    SuministrosComponent
],
  imports: [
    CommonModule,
    InventarioRoutingModule
  ]
})
export class InventarioModule { }
