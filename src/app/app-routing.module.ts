import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPageComponent } from './shared/inicio-page/inicio-page.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { NavegationGuard } from './modules/inventario/guards/navegation.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'inicio',
        component: InicioPageComponent
      },
      {
        path: 'inventario',
        loadChildren: () => import('./modules/inventario/inventario.module').then(m => m.InventarioModule),
        canLoad: [NavegationGuard]
      },
      {
        path: 'tienda',
        loadChildren: () => import('./modules/tienda/tienda.module').then(m => m.TiendaModule),
        canLoad: [NavegationGuard]
      },
      {
        path: 'hospitalizacion',
        loadChildren: () => import('./modules/hospitalizacion/hospitalizacion.module').then(m => m.HospitalizacionModule),
      },
      {
        path: 'historialClinico',
        loadChildren: () => import('./modules/historialClinico/historial-clinico.module').then(m => m.HistorialClinicoModule),
      },    
      {
        path: 'cliente',
        loadChildren: () => import('./modules/cliente/cliente.module').then(module => module.ClienteModule),
        
      },
      {
        path: 'paciente',
        loadChildren: () => import('./modules/paciente/paciente.module').then(module => module.PacienteModule),
        
      },
      {
        path: 'citas',
        loadChildren: () => import('./modules/citas/citas.module').then(module => module.CitasModule),
        
      },
      {
        path: 'error',
        loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
      },
      {
        path: '**',
        redirectTo: 'error'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
