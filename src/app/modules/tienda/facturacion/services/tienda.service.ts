import { Injectable } from '@angular/core';
import { ProductoData, ProductoTable } from '../interfaces/ProductData';


//** Datos Quemados **//
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
const CATEGORYS = ['Accesorios', 'Electrónica', 'Ropa', 'Fitness', 'Joyeria'];

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private productsDB = Array.from({length: 100}, (_, k) => this.convertToData(k + 1))

  constructor() { }

  private createNewProduct(id: number): ProductoData { 
    let name:string =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';
    let image:string = IMAGE[Math.round(Math.random() * (IMAGE.length - 1))];
    let status: string;
    let price: number = Math.round(Math.random() * 100);
    let quantitys:number = Math.round(Math.random() * 100);
    let category: string = CATEGORYS[Math.round(Math.random() * (CATEGORYS.length - 1))];

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
      id: id,
      name: name,
      image: '../assets/img/'+image,
      price: price,
      category: category,
      quantitys: quantitys,
      status: status,
    };

  }

  private convertToData(index: number): ProductoData{
    let NewDatos = { 
      ...this.createNewProduct(index)
    };
    
    return NewDatos;
  }

  getProducts():ProductoData[] {
    return this.productsDB;
  }

}
