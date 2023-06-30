import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    nav{
      font-family: 'Nunito'
    }
    li a span.mr-2{
      font-family: 'Nunito';
    }
  `]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
