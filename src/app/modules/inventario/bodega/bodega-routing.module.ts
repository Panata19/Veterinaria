import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegaComponent } from './pages/main/bodega.component';


const routes: Routes = [
  {
    path: 'Home',
    component: BodegaComponent
  },
  {
    path: '**', redirectTo: 'Home'
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
