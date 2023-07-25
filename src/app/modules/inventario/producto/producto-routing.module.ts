import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './pages/main/producto.component';


const routes: Routes = [
  {
    path: '',
    component: ProductoComponent
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
export class ProductosRoutingModule { }
