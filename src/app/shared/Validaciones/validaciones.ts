export const soloLetrasPattern: string = '^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$';
export const soloNumerosPattern: string = '^[0-9]+$'
export const fechaValida: string = '/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/';

export const arreglarFecha = (fecha: string): string => {

    if(!fecha) return '';
    
    let separarFecha: string[] = fecha.split("/");
    
    let aux: string = separarFecha[0];
    separarFecha[0] = separarFecha[1];
    separarFecha[1] = aux;
    let fechaArreglada: string = separarFecha.join('/');
    return fechaArreglada;
  }