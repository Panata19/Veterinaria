// cliente.service.ts
import { Injectable } from '@angular/core';
import { Cliente } from '../interface/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private cliente: Cliente[] = [
    { id: 1, nombres: "John Gerson", apellidos: "Ati Heras", sexo: "Masculino", edad: 21, nacionalidad: "Ecuatoriana" },
    { id: 2, nombres: "Fiorella", apellidos: "Achi Limones", sexo: "Femenino", edad: 21, nacionalidad: "Ecuatoriana" },
    { id: 3, nombres: "Marco", apellidos: "Ati Carpio", sexo: "Femenino", edad: 32, nacionalidad: "Española" },
    { id: 4, nombres: "Pedro", apellidos: "zambrano Moreno", sexo: "Masculino", edad: 41, nacionalidad: "Argentina" },
    { id: 5, nombres: "María", apellidos: "Romero Santo", sexo: "Femenino", edad: 36, nacionalidad: "Mexicana" },
    { id: 6, nombres: "Diego", apellidos: "Figueroa Sanchez", sexo: "Masculino", edad: 22, nacionalidad: "Colombiana" },
    { id: 7, nombres: "Paula", apellidos: "Paz Mirella", sexo: "Femenino", edad: 28, nacionalidad: "Brasileña" },
    { id: 8, nombres: "Javier", apellidos: "Herrera Saldaña", sexo: "Masculino", edad: 39, nacionalidad: "Chilena" },
    { id: 9, nombres: "Lucía", apellidos: "Ati Sanchez", sexo: "Femenino", edad: 45, nacionalidad: "Costarricense" },
    { id: 10, nombres: "Adrián", apellidos: "Sanchez Hernandez", sexo: "Masculino", edad: 29, nacionalidad: "Venezolana" },
  ];

  getNextId(): number {
    let maxId = 0;
    for (const cliente of this.cliente) {
      if (cliente.id && cliente.id > maxId) {
        maxId = cliente.id;
      }
    }
    return maxId + 1;
  }

  getCliente(): Cliente[] {
    return this.cliente.slice();
  }

  deleteCliente(id: number){
    const index = this.cliente.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      this.cliente.splice(index, 1);
    }
  }

  addCliente(cliente: Cliente) {
    cliente.id = this.getNextId();
    this.cliente.push(cliente);
  }

  editCliente(cliente: Cliente) {
    const index = this.cliente.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      this.cliente[index] = cliente;
    }
  }
}
