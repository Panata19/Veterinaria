export interface SuministroData {
  id: number;
  name: string,
  image: ImageInfo;
  price: number;
  category: string;
  quantitys: number;
  status: string;
}

export interface SuministroTable extends SuministroData{
  buttons: boolean;
}

export interface ImageInfo {
  url: string;
  loading: boolean;
}