import { Pipe, PipeTransform } from '@angular/core';
import { Paciente } from '../interfaces/paciente.interface';

@Pipe({
  name: 'filtroPaciente'
})

export class FiltroPipe implements PipeTransform {

  transform(pacientes: Paciente[], textoBuscar: string, page: number, entradas: string): Paciente[] {

    if (!textoBuscar) return [...pacientes.slice(page, page + parseInt(entradas))]; 
    
    const pacientesFiltrados: Paciente[] = pacientes.filter(p => p.nombreMascota.toLowerCase().trim().includes(textoBuscar) || 
                                                                 p.edad.toString().includes(textoBuscar) || 
                                                                 p.tipoMascota.toLowerCase().trim().includes(textoBuscar) ||
                                                                 p.raza.toLowerCase().trim().includes(textoBuscar) ||
                                                                 p.sexo.toLowerCase().trim().includes(textoBuscar));
    return pacientesFiltrados.slice(page, page + parseInt(entradas));
    
  }
}
