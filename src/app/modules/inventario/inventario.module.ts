import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoComponent } from './producto/producto.component';
import { BodegaComponent } from './bodega/bodega.component';
import { SuministrosComponent } from './suministros/suministros.component';

import { InventarioRoutingModule } from './inventario-routing.module';
import { TemplateComponent } from './template/template.component';
import { SharedModule } from 'src/app/shared/shared.module';



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
    SharedModule
  ]
})
export class InventarioModule { }
