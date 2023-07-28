import { StoreProduct } from "./ProductData";

export interface CompraData {
  Producto: Product,
  Detalles: Detalles
}
//CompraData
export interface Product extends StoreProduct {

}
export interface Detalles{
  cantidad: number;
  precio: number;
  iva: number ;
  valorIva: number;
  precioTotal: number;
}

export interface prueba{
  id: number
}