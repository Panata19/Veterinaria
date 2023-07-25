import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BodegaRoutingModule } from './bodega-routing.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { AddBodegaModalComponent } from './components/add-bodega-modal/add-bodega-modal.component';
import { EditBodegaModalComponent } from './components/edit-bodega-modal/edit-bodega-modal.component';

import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { BodegaPaginatorIntl } from './components/custom-paginator/bodega-paginator-intl';
import { BodegaComponent } from './pages/main/bodega.component';




@NgModule({
  declarations: [
    EditBodegaModalComponent,
    AddBodegaModalComponent,
    BodegaComponent
  ],
  imports: [
    CommonModule,
    BodegaRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
    MatPaginatorModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: BodegaPaginatorIntl }
  ]
})
export class BodegaModule { }
