import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesPipe } from './pipes/badges.pipe';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  declarations: [
    BadgesPipe,
    StatusPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BadgesPipe,
    StatusPipe,
  ]
})
export class PipesModule { }
