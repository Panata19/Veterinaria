import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionComponent } from './facturacion/pages/main/facturacion.component';
import { FacturacionRoutingModule } from './facturacion-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    FacturacionComponent,
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    SharedModule
  ]
})
export class TiendaModule { }
