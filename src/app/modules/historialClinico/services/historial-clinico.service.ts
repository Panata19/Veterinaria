import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {

  get allPacientes(){
    return [...this.pacientes];
  }

  pacientes = [
    { id:1, nombreMascota: 'Max', tipoMascota: 'Perro', raza: 'Labrador Retriever',edad: 5, sexo:'masculino' },
    { id:2, nombreMascota: 'Luna', tipoMascota: 'Gato', raza: 'Siamés', edad: 3, sexo:'femenino' },
    { id:3, nombreMascota: 'Bobby', tipoMascota: 'Perro', raza: 'Bulldog Francés', edad: 2, sexo:'masculino'},
    { id:4, nombreMascota: 'Nala', tipoMascota: 'Gato', raza: 'Persa', edad: 4, sexo:'femenino' },
    { id:5, nombreMascota: 'Rocky', tipoMascota: 'Perro', raza: 'Golden Retriever', edad: 7, sexo:'masculino' },
    { id:6, nombreMascota: 'Coco', tipoMascota: 'Perro', raza: 'Chihuahua', edad: 1, sexo:'masculino' },
    { id:7, nombreMascota: 'Simba', tipoMascota: 'Gato', raza: 'Bengalí', edad: 2, sexo:'masculino' },
    { id:8, nombreMascota: 'Milo', tipoMascota: 'Perro', raza: 'Border Collie', edad: 4, sexo:'masculino' },
    { id:9, nombreMascota: 'Lola', tipoMascota: 'Gato', raza: 'Maine Coon', edad: 6, sexo:'femenino'},
    { id:10, nombreMascota:'Bella', tipoMascota: 'Perro', raza: 'Poodle', edad: 3, sexo:'femenino' },
    { id:11, nombreMascota: 'Tom', tipoMascota: 'Gato', raza: 'Azul Ruso', edad: 5, sexo:'masculino' },
    { id:12, nombreMascota: 'Lucky', tipoMascota: 'Perro', raza: 'Shih Tzu', edad: 2, sexo:'masculino' },
    { id:13, nombreMascota: 'Lucy', tipoMascota: 'Gato', raza: 'Ragdoll', edad: 4, sexo:'femenino' },
    { id:14, nombreMascota: 'Charlie', tipoMascota: 'Perro', raza: 'Bichón Maltés', edad: 3, sexo:'masculino' },
    { id:15, nombreMascota: 'Mia', tipoMascota: 'Gato', raza: 'Angora', edad: 2, sexo:'femenino' },
    { id:16, nombreMascota: 'Bruno', tipoMascota: 'Perro', raza: 'Bulldog Inglés', edad: 5, sexo:'masculino' },
    { id:17, nombreMascota: 'Oliver', tipoMascota: 'Gato', raza: 'Persa', edad: 4, sexo:'masculino' },
    { id:18, nombreMascota: 'Coco', tipoMascota: 'Perro', raza: 'Labrador Retriever', edad: 6, sexo:'femenino'},
    { id:19, nombreMascota: 'Lily', tipoMascota: 'Gato', raza: 'Siamés', edad: 3, sexo:'femenino' },
    { id:20, nombreMascota: 'Rocky', tipoMascota: 'Perro', raza: 'Rottweiler', edad: 4, sexo:'masculino' },
    { id:21, nombreMascota:'Bella', tipoMascota: 'Perro', raza: 'Poodle', edad: 3, sexo:'femenino' },
    { id:22, nombreMascota: 'Tom', tipoMascota: 'Gato', raza: 'Azul Ruso', edad: 5, sexo:'masculino' },
    { id:23, nombreMascota: 'Lucky', tipoMascota: 'Perro', raza: 'Shih Tzu', edad: 2, sexo:'masculino' },
    { id:24, nombreMascota: 'Lucy', tipoMascota: 'Gato', raza: 'Ragdoll', edad: 4, sexo:'femenino' },
    { id:25, nombreMascota: 'Charlie', tipoMascota: 'Perro', raza: 'Bichón Maltés', edad: 3, sexo:'masculino' },
    { id:26, nombreMascota: 'Mia', tipoMascota: 'Gato', raza: 'Angora', edad: 2, sexo:'femenino' },
    { id:27, nombreMascota: 'Bruno', tipoMascota: 'Perro', raza: 'Bulldog Inglés', edad: 5, sexo:'masculino' },
    { id:28, nombreMascota: 'Oliver', tipoMascota: 'Gato', raza: 'Persa', edad: 4, sexo:'masculino' },
    { id:29, nombreMascota: 'Coco', tipoMascota: 'Perro', raza: 'Labrador Retriever', edad: 6, sexo:'femenino'},
    { id:30, nombreMascota: 'Lily', tipoMascota: 'Gato', raza: 'Siamés', edad: 3, sexo:'femenino' },
    { id:31, nombreMascota: 'Rocky', tipoMascota: 'Perro', raza: 'Rottweiler', edad: 4, sexo:'masculino' },
    { id:32, nombreMascota:'Bella', tipoMascota: 'Perro', raza: 'Poodle', edad: 3, sexo:'femenino' },
    { id:33, nombreMascota: 'Tom', tipoMascota: 'Gato', raza: 'Azul Ruso', edad: 5, sexo:'masculino' },
    { id:34, nombreMascota: 'Lucky', tipoMascota: 'Perro', raza: 'Shih Tzu', edad: 2, sexo:'masculino' },
    { id:35, nombreMascota: 'Lucy', tipoMascota: 'Gato', raza: 'Ragdoll', edad: 4, sexo:'femenino' },
    { id:36, nombreMascota: 'Charlie', tipoMascota: 'Perro', raza: 'Bichón Maltés', edad: 3, sexo:'masculino' },
    { id:37, nombreMascota: 'Mia', tipoMascota: 'Gato', raza: 'Angora', edad: 2, sexo:'femenino' },
    { id:38, nombreMascota: 'Bruno', tipoMascota: 'Perro', raza: 'Bulldog Inglés', edad: 5, sexo:'masculino' },
    { id:39, nombreMascota: 'Oliver', tipoMascota: 'Gato', raza: 'Persa', edad: 4, sexo:'masculino' },
    { id:40, nombreMascota: 'Coco', tipoMascota: 'Perro', raza: 'Labrador Retriever', edad: 6, sexo:'femenino'},
    { id:41, nombreMascota: 'Lily', tipoMascota: 'Gato', raza: 'Siamés', edad: 3, sexo:'femenino' },
    { id:42, nombreMascota: 'Rocky', tipoMascota: 'Perro', raza: 'Rottweiler', edad: 4, sexo:'masculino' }
  ];
}
