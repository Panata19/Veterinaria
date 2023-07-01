import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoComponent } from './producto/pages/main/producto.component';
import { BodegaComponent } from './bodega/pages/main/bodega.component';
import { SuministrosComponent } from './suministros/pages/main/suministros.component';

import { InventarioRoutingModule } from './inventario-routing.module';
import { TemplateComponent } from './template/template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { StatusPipe } from './pipes/status.pipe';
import { CustomPaginatorIntl } from 'src/app/shared/components/custom-paginator-intl/custom-paginator-intl';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-delete-modal.component';


@NgModule({
  declarations: [
    ProductoComponent,
    BodegaComponent,
    SuministrosComponent,
    TemplateComponent,
    ConfirmationModalComponent,
    StatusPipe,
],
  imports: [
    CommonModule,
    FormsModule,
    InventarioRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class InventarioModule { }
