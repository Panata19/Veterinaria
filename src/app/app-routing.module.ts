import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { InicioPageComponent } from './shared/inicio-page/inicio-page.component';
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
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule),
        //canActivate: [AuthGuard],
      },
      {
        path: 'inventario',
        loadChildren: () => import('./modules/inventario/inventario.module').then(m => m.InventarioModule),
        //canActivate: [AuthGuard],
      },
      {
        path: 'tienda',
        loadChildren: () => import('./modules/tienda/tienda.module').then(m => m.TiendaModule),
        //canActivate: [AuthGuard],
      },
      {
        path: 'hospitalizacion',
        loadChildren: () => import('./modules/hospitalizacion/hospitalizacion.module').then(m => m.HospitalizacionModule),
        //canActivate: [AuthGuard],
      },
      {
        path: 'historialClinico',
        loadChildren: () => import('./modules/historialClinico/historial-clinico.module').then(m => m.HistorialClinicoModule),
        //canActivate: [AuthGuard],
      },    
      {
        path: 'cliente',
        loadChildren: () => import('./modules/cliente/cliente.module').then(module => module.ClienteModule),   
        //canActivate: [AuthGuard] 
      },
      {
        path: 'paciente',
        loadChildren: () => import('./modules/paciente/paciente.module').then(module => module.PacienteModule),
        //canActivate: [AuthGuard]
      },
      {
        path: 'citas',
        loadChildren: () => import('./modules/citas/citas.module').then(module => module.CitasModule),
        //canActivate: [AuthGuard],
      },
      
    ]
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),  
  },
  {
    path: '**',
    redirectTo: 'error'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
