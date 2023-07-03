import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCardComponent } from './cards/title-card/title-card.component';



@NgModule({
  declarations: [
    TitleCardComponent
  ],
  
  imports: [
    CommonModule
  ],

  exports:[
    TitleCardComponent
  ]
})
export class SharedModule { }
