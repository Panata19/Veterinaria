import { Pipe, PipeTransform } from '@angular/core';
import { HistorialClinico } from '../interfaces/historialClinico';
import { arreglarFecha } from 'src/app/shared/Validaciones/validaciones';

@Pipe({
  name: 'filtroHistorialClinico'
})
export class FiltroHistorialClinicoPipe implements PipeTransform {

  transform(historialesClinicos: HistorialClinico[], fechaFiltro: string, page: number, entradas: string): HistorialClinico[] {
    
    if (!fechaFiltro){
      return [...historialesClinicos.slice(page, page + parseInt(entradas))]; 
    } 

    const fechaFiltroDate = new Date(arreglarFecha(fechaFiltro));

    const historialesFiltrados: HistorialClinico[] = historialesClinicos.filter(his => his.fechaIngreso.getTime() === fechaFiltroDate.getTime());

    return historialesFiltrados.slice(page, page + parseInt(entradas));
  }

}
