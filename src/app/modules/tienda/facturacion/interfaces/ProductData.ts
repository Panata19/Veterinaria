import { ProductoData } from "src/app/modules/inventario/producto/interfaces/ProductData";

export interface ImageInfo {
  url: string;
  loading: boolean;
}

export interface StoreProduct extends ProductoData{
}

export interface StoreProductTable extends StoreProduct{
  buttons: boolean;
}


