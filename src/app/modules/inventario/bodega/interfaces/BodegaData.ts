export interface BodegaData {
  id: number;
  name: string,
  image: string;
  price: number;
  category: string;
  quantitys: number;
  status: string;
}

export interface BodegaTable {
  id: number;
  name: string,
  image: string;
  price: number;
  category: string;
  quantitys: number;
  status: string;
  buttons: boolean;
}