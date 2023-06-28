import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-404',
  templateUrl: './404.component.html',
  styles: [
  ]
})
export class Error404Component implements OnInit {

  constructor( private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      // = urlSegments[0].path; // Ruta actual
      console.log(urlSegments)
    });
  }


}
