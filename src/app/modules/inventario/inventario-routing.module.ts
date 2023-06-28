import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegaComponent } from './bodega/bodega.component';
import { ProductoComponent } from './producto/producto.component';
import { SuministrosComponent } from './suministros/suministros.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bodega',
        component: BodegaComponent
      },
      {
        path: 'producto',
        component: ProductoComponent
      },
      {
        path: 'suministros',
        component: SuministrosComponent
      },
      {
        path: '**', redirectTo: 'bodega'
      }
    ]
    
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class InventarioRoutingModule { }
