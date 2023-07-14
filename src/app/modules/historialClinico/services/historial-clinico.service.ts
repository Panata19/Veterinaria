import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { arreglarFecha } from '../../../shared/Validaciones/validaciones';
import { Paciente } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {

  constructor(private http: HttpClient) { }

  /* SECCIÓN PACIENTES */

  //Este método obtienes todos los pacientes
  get allPacientes(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>('http://localhost:3000/pacientes');
  }

  //Este método obtiene un paciente
  getPaciente(id: number): Observable<Paciente>{
    return this.http.get<Paciente>(`http://localhost:3000/pacientes?id=${id}`);
  }

  get allHistoriaClinico(){
    return [...this.historialesClinicos];
  }

  historialesClinicos = [
    { idHistoriaCli: 1, fechaIngreso: new Date(arreglarFecha('07/07/2023'))},
    { idHistoriaCli: 2, fechaIngreso: new Date(arreglarFecha('07/07/2023'))},
    { idHistoriaCli: 3, fechaIngreso: new Date(arreglarFecha('07/07/2023'))},
    { idHistoriaCli: 4, fechaIngreso: new Date(arreglarFecha('06/07/2023'))},
    { idHistoriaCli: 5, fechaIngreso: new Date(arreglarFecha('06/07/2023'))},
    { idHistoriaCli: 6, fechaIngreso: new Date(arreglarFecha('06/07/2023'))},
    { idHistoriaCli: 7, fechaIngreso: new Date(arreglarFecha('06/07/2023'))},
    { idHistoriaCli: 8, fechaIngreso: new Date(arreglarFecha('06/07/2023'))},
    { idHistoriaCli: 9, fechaIngreso: new Date(arreglarFecha('06/07/2023'))},
    { idHistoriaCli: 10, fechaIngreso: new Date(arreglarFecha('06/07/2023'))},
  ]
}
