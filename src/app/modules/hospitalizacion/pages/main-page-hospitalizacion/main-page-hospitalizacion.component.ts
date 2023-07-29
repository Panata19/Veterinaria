import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-hospitalizacion',
  templateUrl: './main-page-hospitalizacion.component.html',
  styleUrls: ['./main-page-hospitalizacion.component.css']
})
export class MainPageHospitalizacionComponent implements OnInit {
 
  isMobile: boolean = false;

  constructor(){ }
  
  ngOnInit(): void {
    this.onResize;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 768; // Puedes ajustar este valor según tu definición de tamaño móvil
  }
}





