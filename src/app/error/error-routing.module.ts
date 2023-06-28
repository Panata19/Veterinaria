import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './404/404.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: Error404Component
      },
      {
        path: '**', redirectTo: '404'
      }
    ]
  },
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
