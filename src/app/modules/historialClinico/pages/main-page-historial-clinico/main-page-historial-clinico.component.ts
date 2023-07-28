import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page-historial-clinico',
  templateUrl: './main-page-historial-clinico.component.html',
  styleUrls: ['./main-page-historial-clinico.component.css']
})
export class MainPageHistorialClinicoComponent {
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
