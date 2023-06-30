import { Injectable } from '@angular/core';
import ProductoData from '../interfaces/ProductData';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  /** Builds and returns a new User. */
  createNewUser(id: number): ProductoData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      id: id.toString(),
      name: name,
      image: name+'.jpg',
      price: Math.round(Math.random() * 100),
      category: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
      quantitys: Math.round(Math.random() * 100),
      status: 'INSTOCK'
    };
  }
}
