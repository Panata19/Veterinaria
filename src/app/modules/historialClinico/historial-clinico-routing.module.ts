import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { MainPageHistorialClinicoComponent } from './pages/main-page-historial-clinico/main-page-historial-clinico.component';
import { HistorialClinicoPacienteComponent } from './pages/historial-clinico-paciente/historial-clinico-paciente.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'mainPage' , component: MainPageHistorialClinicoComponent },
      { path: 'historalClinicoPaciente', component: HistorialClinicoPacienteComponent },
      { path: '**', redirectTo: 'mainPage' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HistorialClinicoRoutingModule { }
