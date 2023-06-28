import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacionComponent } from './facturacion/facturacion.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FacturacionComponent
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class FacturacionRoutingModule { }
