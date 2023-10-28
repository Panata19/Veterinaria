import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente.interface';
import { Medico } from '../interfaces/medico.interface';
import { Hospitalizacion } from '../interfaces/hospitalizacion.interface';
import { TipoCirugias } from '../interfaces/tipoCirugias.interface';

@Injectable({
  providedIn: 'root'
})

export class HosipitalizacionService {

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

  /* SECCIÓN MÉDICOS */

  //Este método obtienes todos los médicos
  get allMedicos(): Observable<Medico[]>{
    return this.http.get<Medico[]>('http://localhost:3000/medicos');
  }
  
  //Este método obtiene un médico
  getMedico(id: number): Observable<Medico>{
    return this.http.get<Medico>(`http://localhost:3000/medicos?idMedico=${id}`);
  }

  /* SECCIÓN HOSPITALIZACIONES */

  //Este método obtienes todos los hospitalizaciones
  get allHospitalizaciones(): Observable<Hospitalizacion[]>{
    return this.http.get<Hospitalizacion[]>('http://localhost:3000/hospitalizaciones');
  }
  
  //Este método obtiene un médico
  getHospitalizacion(id: number): Observable<Hospitalizacion>{
    return this.http.get<Hospitalizacion>(`http://localhost:3000/hospitalizaciones?idHospitalizacion=${id}`);
  }

  //Este método registra una nueva hospitalización
  registrarNuevaHospitalizacion(hospitalizacion: Hospitalizacion): Observable<Hospitalizacion>{
    const opciones = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    };
    return this.http.post<Hospitalizacion>('http://localhost:3000/hospitalizaciones', hospitalizacion, opciones);
  }

  //SECCIÓN CIRUGÍAS

  //Este método obtienes todos los tipos de cirugias
  get allTipoCirugias(): Observable<TipoCirugias[]>{
    return this.http.get<TipoCirugias[]>('http://localhost:3000/tipoCirugias');
  }

  //Este método obtienes un tipo de cirugia
  getTipoCirugia(id: number): Observable<TipoCirugias>{
    return this.http.get<TipoCirugias>(`http://localhost:3000/tipoCirugias?idTipoCirugia=${id}`);
  }
}


