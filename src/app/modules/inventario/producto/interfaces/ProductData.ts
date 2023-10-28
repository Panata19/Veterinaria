export interface ProductoData {
  id: number;
  name: string,
  image: ImageInfo;
  price: number;
  category: string;
  quantitys: number;
  status: string;
}

export interface ProductoTable extends ProductoData {
  buttons: boolean;
}

export interface ImageInfo {
  url: string;
  loading: boolean;
}