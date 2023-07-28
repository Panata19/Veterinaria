import { Detalles, StoreElement } from "../interfaces/CompraProducto";

export interface AppState {
  objetos: Objeto[];
}

export interface Objeto extends StoreElement{
}

export interface CompraDetalles extends Detalles {
  
}