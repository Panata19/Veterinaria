import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './404/pages/404.component';
import { Error403Component } from './403/pages/403.component';



const routes: Routes = [
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '403',
    component: Error403Component
  },
  {
    path: '**', redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class ErrorRoutingModule { }
