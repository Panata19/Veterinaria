import { Pipe, PipeTransform } from '@angular/core';
import { Hospitalizacion } from '../interfaces/hospitalizacion.interface';
import { arreglarFecha } from 'src/app/shared/Validaciones/validaciones';

@Pipe({
  name: 'filtroHospitalizacion'
})

export class FiltroHospitalizacionPipe implements PipeTransform {
  
  hospitalizacionesFiltradas: Hospitalizacion[] = [];

  transform(hospitalizaciones: Hospitalizacion[], filtro: string, page: number, entradas: string, tipoInput?: string, 
            nombreInput?: string): Hospitalizacion[] {

    if (!filtro){
      return [...hospitalizaciones].slice(page, page + +entradas);
    }
 
    if(tipoInput === "text"){
      filtro = filtro.toLowerCase().trim();
      this.hospitalizacionesFiltradas = [...hospitalizaciones.filter(hosp => 
        hosp.paciente.nombrePaciente.toLowerCase().trim().includes(filtro))]
    }

    if(tipoInput === "date" && nombreInput === "fechaNac"){
      const fechaFiltroDate = new Date(arreglarFecha(filtro));
      this.hospitalizacionesFiltradas = [...hospitalizaciones.filter(hosp => 
        new Date(hosp.paciente.fechaNac).getTime() === fechaFiltroDate.getTime())];
    }

    if(tipoInput === "date" && nombreInput === "fechaIngreso"){
      const fechaFiltroDate = new Date(arreglarFecha(filtro));
      this.hospitalizacionesFiltradas = [...hospitalizaciones.filter(hosp => new Date(hosp.fechaIngreso).getTime() === fechaFiltroDate.getTime())];
    }
    
    return [...this.hospitalizacionesFiltradas].slice(page, page + +entradas);
  }

}
