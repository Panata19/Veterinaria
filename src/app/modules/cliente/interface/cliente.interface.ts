
export interface Cliente {
    id?: number;
    numDocumento: string;
    nombreCliente: string;
    apellidosCliente: string;
    sexo: string;
    telefono: string;
    direccion: string;
    correo?: string;
    fechaNac: Date;
    nacionalidad: string;  
}


