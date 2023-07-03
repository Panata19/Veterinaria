import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
