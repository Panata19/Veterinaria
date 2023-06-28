import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Error404Component } from './404/pages/404.component';
import { ErrorRoutingModule } from './error-routing.module';
import { TemplateComponent } from './template/template.component';



@NgModule({
  declarations: [
    Error404Component,
    TemplateComponent,
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    SharedModule
  ]
})
export class ErrorModule { }
