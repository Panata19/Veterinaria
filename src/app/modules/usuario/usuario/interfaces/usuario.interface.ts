export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    contrasenia: string;
    correo: string;
    bloqueado: boolean;
    estadoUsuario: string;
    fechaCreacion: Date;
    fechaActualizacion?: Date;
    fechaEliminacion?: Date;
    idPerfil: number;
}
  