// cliente.service.ts
import { Injectable } from '@angular/core';
import { Cliente } from '../interface/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private cliente: Cliente[] = [
    { id: 1, numDocumento: "123456789", nombreCliente: "John", apellidosCliente: "Gerson", sexo: "Masculino", telefono: "0923456789", direccion: "Calle Principal 123", correo: "", fechaNac: new Date(2002, 3, 8), nacionalidad: "Ecuatoriana" },
    { id: 2, numDocumento: "987654321", nombreCliente: "Fiorella", apellidosCliente: "Achi Limones", sexo: "Femenino", telefono: "0987654321", direccion: "Avenida Central 456", correo: "fiorella@example.com", fechaNac: new Date(2001, 9, 27), nacionalidad: "Ecuatoriana" },
    { id: 3, numDocumento: "567890123", nombreCliente: "Marco", apellidosCliente: "Ati Carpio", sexo: "Masculino", telefono: "0967890123", direccion: "Plaza Mayor 789", correo: "@example.com",fechaNac: new Date(1990, 6, 17), nacionalidad: "Española" },
    { id: 4, numDocumento: "321654987", nombreCliente: "Pedro", apellidosCliente: "Zambrano Moreno", sexo: "Masculino", telefono: "0921654987", direccion: "Calle Secundaria 456",  correo: "@example.com",fechaNac: new Date(1970, 7, 23), nacionalidad: "Argentina" },
    { id: 5, numDocumento: "654321098", nombreCliente: "María", apellidosCliente: "Romero Santo", sexo: "Femenino", telefono: "0954321098", direccion: "Avenida Principal 789", correo: "maria@example.com", fechaNac: new Date(1999, 8, 30), nacionalidad: "Mexicana" },
    { id: 6, numDocumento: "234567890", nombreCliente: "Diego", apellidosCliente: "Figueroa Sanchez", sexo: "Masculino", telefono: "0934567890", direccion: "Plaza Secundaria 123",correo: "@example.com" ,fechaNac: new Date(1985, 4, 20), nacionalidad: "Colombiana" },
    { id: 7, numDocumento: "678901234", nombreCliente: "Paula", apellidosCliente: "Paz Mirella", sexo: "Femenino", telefono: "0978901234", direccion: "Calle Mayor 456", correo: "paula@example.com", fechaNac: new Date(1988, 5, 12), nacionalidad: "Brasileña" },
    { id: 8, numDocumento: "345678901", nombreCliente: "Javier", apellidosCliente: "Herrera Saldaña", sexo: "Masculino", telefono: "0945678901", direccion: "Avenida Secundaria 789", correo: "@example.com",fechaNac: new Date(1987, 1, 12), nacionalidad: "Chilena" },
    { id: 9, numDocumento: "789012345", nombreCliente: "Lucía", apellidosCliente: "Ati Sanchez", sexo: "Femenino", telefono: "0989012345", direccion: "Plaza Central 123",correo: "@example.com", fechaNac: new Date(1990, 9, 12), nacionalidad: "Costarricense" },
    { id: 10, numDocumento: "456789012", nombreCliente: "Adrián", apellidosCliente: "Sanchez Hernandez", sexo: "Masculino", telefono: "0956789012", direccion: "Calle Principal 456", correo: "@example.com",fechaNac: new Date(1999, 7, 26), nacionalidad: "Venezolana" },
    
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
