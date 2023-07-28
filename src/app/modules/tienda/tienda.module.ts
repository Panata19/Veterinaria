import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { PaginatePipe } from './facturacion/pipe/paginate.pipe';

import { FacturacionComponent } from './facturacion/pages/main/facturacion.component';
import { ModalAddCarritoComponent } from './facturacion/components/modal-addCarrito/modal-addCarrito.component';
import { ModalCarritoComponent } from './facturacion/components/modal-carrito/modal-carrito.component';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ProductoPaginatorIntl } from './facturacion/components/custom-paginator/producto-paginator-intl';

import { appReducer } from './facturacion/services/app.reducer';




@NgModule({
  declarations: [
    FacturacionComponent,
    PaginatePipe,
    ModalAddCarritoComponent,
    ModalCarritoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FacturacionRoutingModule,
    SharedModule,
    MaterialModule,
    PipesModule,
    StoreModule.forRoot({ app: appReducer })
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: ProductoPaginatorIntl },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        showError: true,
        displayDefaultIndicatorType: false
      },
    },
  ],
})
export class TiendaModule { }
