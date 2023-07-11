import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Error404Component } from './404/pages/404.component';
import { ErrorRoutingModule } from './error-routing.module';
import { Error403Component } from './403/pages/403.component';



@NgModule({
  declarations: [
    Error404Component,
    Error403Component,
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    SharedModule
  ]
})
export class ErrorModule { }
