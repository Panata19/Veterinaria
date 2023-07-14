export interface ProductoData {
  id: number;
  name: string,
  image: string;
  price: number;
  category: string;
  quantitys: number;
  status: string;
}

export interface ProductoTable {
  id: number;
  name: string,
  image: string;
  price: number;
  category: string;
  quantitys: number;
  status: string;
  buttons: boolean;
}