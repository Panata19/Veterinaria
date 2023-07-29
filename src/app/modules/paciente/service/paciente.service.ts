import { Injectable } from '@angular/core';
import { Paciente } from '../interface/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor() {/* */ }
  private pacientes: Paciente[] = [
    { id: 1, nombre: "Juan ", sexo: "Masculino",tipoPaciente: "Perro" ,  Fechadenacimiento: new Date(2015, 5, 5), raza: "Labrador", peso: 30 },
    { id: 2, nombre: "Maria ", sexo: "Femenino",tipoPaciente: "Perro"  , Fechadenacimiento: new Date(2016, 5, 12), raza: "Bulldog", peso: 25 },
    { id: 3, nombre: "Pedro ", sexo: "Masculino",tipoPaciente: "Gato"  , Fechadenacimiento: new Date(2020, 5, 6), raza: "Abisinio", peso: 35 },
    { id: 4, nombre: "Laura ", sexo: "Femenino", tipoPaciente: "Perro" ,Fechadenacimiento: new Date(2018, 5, 4), raza: "Chihuahua", peso: 5 },
    { id: 5, nombre: "Carlos", sexo: "Masculino",tipoPaciente: "Perro"  ,Fechadenacimiento: new Date(2019, 5, 2), raza: "Poodle", peso: 10 },
    { id: 6, nombre: "Ana ", sexo: "Femenino", tipoPaciente: "Perro"  ,Fechadenacimiento: new Date(2020, 5, 4), raza: "Husky Siberiano", peso: 40 },
    { id: 7, nombre: "Diego ", sexo: "Masculino",tipoPaciente: "Gato" , Fechadenacimiento: new Date(2022, 5, 15), raza: "Asiático", peso: 16 },
    { id: 8, nombre: "Sofia ", sexo: "Femenino",  tipoPaciente: "Gato" ,Fechadenacimiento: new Date(2019, 5, 20), raza: "Balinés", peso: 8 },
    { id: 9, nombre: "Javier ", sexo: "Masculino", tipoPaciente: "Perro" , Fechadenacimiento: new Date(2018, 5, 26), raza: "Dálmata", peso: 25 },
    { id: 10, nombre: "Lucia", sexo: "Femenino", tipoPaciente: "Gato"  ,Fechadenacimiento: new Date(2017, 5, 24), raza: "Bengalí", peso: 30 }
  ];


  getNextId(): number {
    let maxId = 0;
    for (const pacientes of this.pacientes) {
      if (pacientes.id && pacientes.id > maxId) {
        maxId = pacientes.id;
      }
    }
    return maxId + 1;
  }


  ConseguirPaciente(): Paciente[] {
    return this.pacientes.slice();
  }

 
  Eliminarpacientes(id: number){
    const index = this.pacientes.findIndex(pacientes => pacientes.id === id);
    if (index !== -1) {
      this.pacientes.splice(index, 1);
    }
  }

  Agregarpacientes(pacientes: Paciente) {
    pacientes.id = this.getNextId();
    this.pacientes.push(pacientes);
  }

  Editarpacientes(pacientes: Paciente) {
    const index = this.pacientes.findIndex(c => c.id === pacientes.id);
    if (index !== -1) {
      this.pacientes[index] = pacientes;
    }
  }




}
