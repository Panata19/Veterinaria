import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-error-404',
  templateUrl: './404.component.html',
  styles: [`
  .mw{
    min-width: 30vw !important;
  }
  `]
})
export class Error404Component implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    
  }


}
