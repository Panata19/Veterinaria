import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPageComponent } from './shared/inicio-page/inicio-page.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [

  {
    path: 'inicio',
    component: InicioPageComponent
  },
  {
    path: 'cliente',
    loadChildren: () => import('./Gesclipac/cliente/cliente.module').then(module => module.ClienteModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./Gesclipac/paciente/paciente.module').then(module => module.PacienteModule)
  },  
  {
    path: 'cita',
    loadChildren: () => import('./GesCi/citas/citas.module').then(module => module.CitasModule)
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

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
