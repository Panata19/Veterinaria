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

const IMAGE: string[] = [
  'bamboo-watch.jpg',
  'black-watch.jpg',
  'bracelet.jpg',
  'blue-t-shirt.jpg',
  'blue-band.jpg',
  'brown-purse.jpg',
  'galaxy-earrings.jpg',
  'game-controller.jpg',
  'gaming-set.jpg',
  'green-earbuds.jpg',
  'painted-phone-case.jpg'
]

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsDB = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1))
  constructor() {}

  /** Builds and returns a new User. */
  private createNewUser(id: number): ProductoData { 
    let name:string =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';
    let image:string = IMAGE[Math.round(Math.random() * (IMAGE.length - 1))];
    let status: string;
    let quantitys:number = Math.round(Math.random() * 100);
    switch (true) {
      case quantitys > 10:
        status = 'IN STOCK';
        break;
      case quantitys > 0 && quantitys <= 10:
        status = "LOW STOCK";
        break;
      case quantitys === 0:
        status = "OUT OF STOCK"
        break;
      default:
        status = "UNKNOWN"
        break;
    }
    return {
      id: id.toString(),
      name: name,
      image: '../../../../../../assets/img/'+image,
      price: Math.round(Math.random() * 100),
      category: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
      quantitys: quantitys,
      status: status,
      buttons: true,
    };
  }

  getProducts():ProductoData[] {
    return this.productsDB;
  }

  deleteProduct(product:ProductoData){
    console.log(product);
    this.productsDB.pop();
  }

  addProduct(newProduct: ProductoData){
    this.productsDB.push(this.createNewUser(this.productsDB.length+1));
    //this.productsDB.push(newProduct);
  }
}
