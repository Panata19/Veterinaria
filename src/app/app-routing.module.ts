import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error/404/404.component';

const routes: Routes = [
  {
    path: 'inventario',
    loadChildren: () => import('./modules/inventario/inventario.module').then( m => m.InventarioModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./modules/tienda/tienda.module').then( m => m.TiendaModule)
  },
  {
    path: '404',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
