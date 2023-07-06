import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesPipe } from './pipes/badges.pipe';
import { ImagePipe } from './pipes/image.pipe';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  declarations: [
    BadgesPipe,
    ImagePipe,
    StatusPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BadgesPipe,
    ImagePipe,
    StatusPipe,
  ]
})
export class PipesModule { }
