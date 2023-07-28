import { CompraData, Detalles } from "../interfaces/CompraProducto";

export interface AppState {
  objetos: Objeto[];
}

export interface Objeto extends CompraData{

}

export interface CompraDetalles extends Detalles {
  
}