export interface BodegaData {
  id: number;
  name: string,
  image: ImageInfo;
  price: number;
  category: string;
  quantitys: number;
  stock: string;
}

export interface BodegaTable extends BodegaData {
  buttons: boolean;
}

export interface ImageInfo {
  url: string;
  loading: boolean;
}