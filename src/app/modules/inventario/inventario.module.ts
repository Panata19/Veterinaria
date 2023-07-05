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
import { ImagePipe } from './pipes/image.pipe';
import { EditBodegaModalComponent } from './bodega/components/edit-bodega-modal/edit-bodega-modal.component';
import { AddBodegaModalComponent } from './bodega/components/add-bodega-modal/add-bodega-modal.component';
import { AddSuministrosModalComponent } from './suministros/components/add-suministros-modal/add-suministros-modal.component';
import { EditSuministrosModalComponent } from './suministros/components/edit-suministros-modal/edit-suministros-modal.component';




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
    ImagePipe,
    EditBodegaModalComponent,
    AddBodegaModalComponent,
    AddSuministrosModalComponent,
    EditSuministrosModalComponent,
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
