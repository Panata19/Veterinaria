import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '**',
    redirectTo: 'error'
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
