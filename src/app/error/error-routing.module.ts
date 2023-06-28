import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './404/pages/404.component';
import { TemplateComponent } from './template/template.component';


const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
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
