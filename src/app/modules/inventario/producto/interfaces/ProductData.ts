export interface ProductoData {
  id: number;
  name: string,
  image: ImageInfo;
  price: number;
  category: string;
  quantitys: number;
  stock: string;
}

export interface ProductoTable extends ProductoData {
  buttons: boolean;
}

export interface ImageInfo {
  url: string;
  loading: boolean;
}