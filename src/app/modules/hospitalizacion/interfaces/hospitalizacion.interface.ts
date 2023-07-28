import { Paciente } from "./paciente.interface";

export interface Hospitalizacion {
    idHospitalizacion : number;
    paciente          : Paciente;
    fechaIngreso      : string;
    fechaSalida       : string;
    motivo            : string;
    estadoHosPaciente : string;
}