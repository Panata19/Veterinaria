import { Component, OnInit } from '@angular/core';
import { HistorialClinicoService } from '../../services/historial-clinico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-clinico-paciente',
  templateUrl: './historial-clinico-paciente.component.html',
  styleUrls: ['./historial-clinico-paciente.component.css']
})
export class HistorialClinicoPacienteComponent {

  entradas: string = "5";
  page: number = 0;
  fechaBuscar!: string;

  constructor(private hospitalizacionServices: HistorialClinicoService,
              private router: Router) { }

  get allHistorialClinico(){
    return [...this.hospitalizacionServices.allHistoriaClinico];
  }

  irPaginaHistorialClinicaPaciente(){
    this.router.navigate(['historialClinico/historalClinicoPaciente']);
  }
  
  //Este método reseta las paginas si ingreso algo en el campo de búsqueda
  resetearPaginas(){
    this.page = 0;
  }

  paginaSiguiente(){
    this.page += parseInt(this.entradas);
  }

  paginaAnterior(){ 
    if(this.page > 0) {
      this.page -= parseInt(this.entradas);
    }
  
    if(this.page < parseInt(this.entradas)){
      this.page = 0;
    }
  }

}
