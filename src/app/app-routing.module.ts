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
  },
  { 
    path: 'hospitalizacion', 
    loadChildren: () => import('./modules/hospitalizacion/hospitalizacion.module').then( m => m.HospitalizacionModule ) 
  },

  {
    path: 'historialClinico',
    loadChildren: () => import('./modules/historialClinico/historial-clinico.module').then( m => m.HistorialClinicoModule )
  },

  {
    path: '**',
    redirectTo: 'hospitalizacion'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
