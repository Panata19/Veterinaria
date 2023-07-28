import { ProductoData } from "src/app/modules/inventario/producto/interfaces/ProductData";

export interface CompraData {
  Producto: Product,
  Detalles: Detalles
}
//CompraData
export interface Product extends ProductoData {  }

export interface Detalles{
  cantidad: number;
  precio: number;
  iva: number ;
  valorIva: number;
  precioTotal: number;
}

export interface prueba{ //Cambiar pa Modal-Carrito
  id: number
}


export interface StoreProduct extends ProductoData{
  
}

export interface StoreElement{
  enCarrito: boolean,
  Compra: CompraData
}


