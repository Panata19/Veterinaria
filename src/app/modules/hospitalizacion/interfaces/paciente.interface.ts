import { Cliente } from "./cliente.interface";
import { TipoPaciente } from "./tipoPaciente.interface";

export interface Paciente {
    idPaciente:     number;
    nombrePaciente: string;
    fechaNac:       string;
    edad:           number;
    raza:           string;
    sexo:           string;
    tipoPaciente:   TipoPaciente;
    cliente:        Cliente;  
    estadoPaciente: string;
}