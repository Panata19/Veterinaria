import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegaComponent } from './bodega/pages/main/bodega.component';
import { ProductoComponent } from './producto/pages/main/producto.component';
import { SuministrosComponent } from './suministros/pages/main/suministros.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'bodega',
        component: BodegaComponent
      },
      {
        path: 'productos',
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
