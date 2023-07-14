export interface SuministroData {
  id: number;
  name: string,
  image: string;
  price: number;
  category: string;
  quantitys: number;
  status: string;
}

export interface SuministroTable {
  id: number;
  name: string,
  image: string;
  price: number;
  category: string;
  quantitys: number;
  status: string;
  buttons: boolean;
}