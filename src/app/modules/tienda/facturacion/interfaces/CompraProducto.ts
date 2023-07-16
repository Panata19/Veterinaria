import { ProductoData } from "./ProductData";

export interface CompraData extends ProductoData{
}

export interface CompraPaso1{
  cantidadTotal: number;
  precio: number;
  valorIva: number;
  precioTotal: number;
  iva: number ;
}