import { Component } from '@angular/core';
import { HistorialClinicoService } from '../../services/historial-clinico.service';
import { Router } from '@angular/router';
import { FiltroPipe } from '../../pipes/filtro.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  displayedColumnsHeader: string[] = ['id', 'nombrePaciente', 'tipo', 'raza', 'edad', 'sexo', 'opciones'];
  entradas: string = "5";
  page: number = 0;
  textoBuscar!: string;

  constructor(private hospitalizacionServices: HistorialClinicoService,
              private router: Router) { }

  get allHistorialClinico(){
    return [...this.hospitalizacionServices.allPacientes];
  }

  irPaginaHistorialClinicaPaciente(){
    this.router.navigate(['historialClinico/historalClinicoPaciente']);
  }

  buscarPaciente(texto: string){
    this.page = 0;
    this.textoBuscar = texto.toLowerCase().trim();
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
