import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductoComponent } from './producto/pages/main/producto.component';
import { BodegaComponent } from './bodega/pages/main/bodega.component';
import { SuministrosComponent } from './suministros/pages/main/suministros.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { StatusPipe } from './pipes/status.pipe';
import { CustomPaginatorIntl } from 'src/app/shared/components/custom-paginator-intl/custom-paginator-intl';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-delete-modal.component';
import { AddProductModalComponent } from './producto/components/add-product-modal/add-product-modal.component';
import { BadgesPipe } from './pipes/badges.pipe';
import { EditProductModalComponent } from './producto/components/edit-product-modal/edit-product-modal.component';




@NgModule({
  declarations: [
    ProductoComponent,
    BodegaComponent,
    SuministrosComponent,
    ConfirmationModalComponent,
    StatusPipe,
    AddProductModalComponent,
    BadgesPipe,
    EditProductModalComponent,
],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class InventarioModule { }
