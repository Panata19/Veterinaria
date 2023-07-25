import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { ProductosRoutingModule } from './producto-routing.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { ProductoPaginatorIntl } from './components/custom-paginator/producto-paginator-intl';
import { ProductoComponent } from './pages/main/producto.component';



@NgModule({
  declarations: [
    AddProductModalComponent,
    EditProductModalComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: ProductoPaginatorIntl }
  ]
})
export class ProductoModule { }
