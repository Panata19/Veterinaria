// cliente.service.ts
import { Injectable } from '@angular/core';
import { Cliente } from '../interface/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private cliente: Cliente[] = [
    { id: 1, numDocumento: "0123456789", nombreCliente: "John", apellidosCliente: "Gerson", sexo: "Masculino", telefono: "0923456789", direccion: "Calle Principal 123", correo: "john@example.com", fechaNac: new Date(2002, 3, 8), nacionalidad: "Ecuatoriana",estado: true,fechaCreacion: new Date(2023, 6, 20) },
    { id: 2, numDocumento: "0987654321", nombreCliente: "Fiorella", apellidosCliente: "Achi Limones", sexo: "Femenino", telefono: "0987654321", direccion: "Avenida Central 456", correo: "fiorella@example.com", fechaNac: new Date(2001, 9, 27), nacionalidad: "Ecuatoriana" ,estado: true,fechaCreacion: new Date(2023, 6, 20)},
    { id: 3, numDocumento: "0567890123", nombreCliente: "Marco", apellidosCliente: "Ati Carpio", sexo: "Masculino", telefono: "0967890123", direccion: "Plaza Mayor 789", correo: "a@example.com",fechaNac: new Date(1990, 6, 17), nacionalidad: "Española",estado: true,fechaCreacion: new Date(2023, 6, 20) },
    { id: 4, numDocumento: "0321654987", nombreCliente: "Pedro", apellidosCliente: "Zambrano Moreno", sexo: "Masculino", telefono: "0921654987", direccion: "Calle Secundaria 456",  correo: "a@example.com",fechaNac: new Date(1970, 7, 23), nacionalidad: "Argentina" ,estado: true,fechaCreacion: new Date(2023, 6, 20)},
    { id: 5, numDocumento: "0654321098", nombreCliente: "María", apellidosCliente: "Romero Santo", sexo: "Femenino", telefono: "0954321098", direccion: "Avenida Principal 789", correo: "maria@example.com", fechaNac: new Date(1999, 8, 30), nacionalidad: "Mexicana",estado: true,fechaCreacion: new Date(2023, 6, 20) },
    { id: 6, numDocumento: "0234567890", nombreCliente: "Diego", apellidosCliente: "Figueroa Sanchez", sexo: "Masculino", telefono: "0934567890", direccion: "Plaza Secundaria 123",correo: "a@example.com" ,fechaNac: new Date(1985, 4, 20), nacionalidad: "Colombiana",estado: true,fechaCreacion: new Date(2023, 6, 20) },
    { id: 7, numDocumento: "0678901234", nombreCliente: "Paula", apellidosCliente: "Paz Mirella", sexo: "Femenino", telefono: "0978901234", direccion: "Calle Mayor 456", correo: "paula@example.com", fechaNac: new Date(1988, 5, 12), nacionalidad: "Brasileña" ,estado: true,fechaCreacion: new Date(2023, 6, 20)},
    { id: 8, numDocumento: "0345678901", nombreCliente: "Javier", apellidosCliente: "Herrera Saldaña", sexo: "Masculino", telefono: "0945678901", direccion: "Avenida Secundaria 789", correo: "a@example.com",fechaNac: new Date(1987, 1, 12), nacionalidad: "Chilena" ,estado: true,fechaCreacion: new Date(2023, 6, 20)},
    { id: 9, numDocumento: "0789012345", nombreCliente: "Lucía", apellidosCliente: "Ati Sanchez", sexo: "Femenino", telefono: "0989012345", direccion: "Plaza Central 123",correo: "a@example.com", fechaNac: new Date(1990, 9, 12), nacionalidad: "Costarricense",estado: false,fechaCreacion: new Date(2023, 6, 20) },
    { id: 10, numDocumento: "0456789012", nombreCliente: "Adrián", apellidosCliente: "Sanchez Hernandez", sexo: "Masculino", telefono: "0956789012", direccion: "Calle Principal 456", correo: "a@example.com",fechaNac: new Date(1999, 7, 26), nacionalidad: "Venezolana",estado: true,fechaCreacion: new Date(2023, 6, 20) },
    
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
  

  ClienteExistente(numDoc: string, currentClientId?: number): boolean {
    return this.cliente.some(cliente => cliente.numDocumento === numDoc && (currentClientId ? cliente.id !== currentClientId : true) && cliente.estado);
  }
  
 

  deleteCliente(id: number) {
    const cliente = this.cliente.find((c) => c.id === id);
    if (cliente) {
      cliente.estado = false; 
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
