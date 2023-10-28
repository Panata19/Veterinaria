import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styles: [
    `
      h1{
        width: 100%;
        border-bottom: 1px solid gray;
        font-size: 2rem
      }
    `
  ]
})
export class TitleCardComponent {

  @Input() titulo!: string 

}
