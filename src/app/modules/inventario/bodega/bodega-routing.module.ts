import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegaComponent } from './pages/main/bodega.component';


const routes: Routes = [
  {
    path: '',
    component: BodegaComponent
  },
  {
    path: '**', redirectTo: ''
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BodegaRoutingModule { }
