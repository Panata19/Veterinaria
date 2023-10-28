import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  transform(array: any[], options: {itemsPerPage: number, currentPage: number}): any {
    // Obtener la cantidad de elementos por página y la página actual
    const { itemsPerPage, currentPage } = options;
    
    // Calcular el índice del primer elemento de la página
    const startIndex = (currentPage) * itemsPerPage;
    
    // Retornar el subarray de la página
    return array.slice(startIndex, startIndex + itemsPerPage); 
  }
}