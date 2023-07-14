export const soloLetrasPattern: string = '^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$';
export const soloNumerosPattern: string = '^[0-9]+$'

export const arreglarFecha = (fecha: string): string => {
    let separarFecha: string[] = fecha.split("/");
    
    let aux: string = separarFecha[0];
    separarFecha[0] = separarFecha[1];
    separarFecha[1] = aux;
    let fechaArreglada: string = separarFecha.join('/');
    return fechaArreglada;
  }