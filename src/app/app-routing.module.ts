import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPageComponent } from './shared/inicio-page/inicio-page.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';

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
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule)
      },
      {
        path: 'inventario',
        loadChildren: () => import('./modules/inventario/inventario.module').then(m => m.InventarioModule)
      },
      {
        path: 'tienda',
        loadChildren: () => import('./modules/tienda/tienda.module').then(m => m.TiendaModule)
      },
      {
        path: 'hospitalizacion',
        loadChildren: () => import('./modules/hospitalizacion/hospitalizacion.module').then(m => m.HospitalizacionModule)
      },

      {
        path: 'historialClinico',
        loadChildren: () => import('./modules/historialClinico/historial-clinico.module').then(m => m.HistorialClinicoModule)
      },    
      {
        path: 'cliente',
        loadChildren: () => import('./modules/cliente/cliente.module').then(module => module.ClienteModule)
      },
      {
        path: 'paciente',
        loadChildren: () => import('./modules/paciente/paciente.module').then(module => module.PacienteModule)
      },
      {
        path: 'citas',
        loadChildren: () => import('./modules/citas/citas.module').then(module => module.CitasModule)
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
        path: '404',
        component: ErrorPageComponent
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
