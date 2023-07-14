import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageHospitalizacionComponent } from './pages/main-page-hospitalizacion/main-page-hospitalizacion.component';

const routes: Routes = [
  { path: '', 
    children: [
      { path: 'mainPage' , component: MainPageHospitalizacionComponent },
      { path: '**', redirectTo: 'mainPage' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HospitalizacionRoutingModule { }
