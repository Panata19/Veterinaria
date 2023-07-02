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

  productsDB = Array.from({length: 100}, (_, k) => this.createNewProduct(k + 1))
  constructor() {}

  /**
  * *createNewProduct
  * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
  * @param id: Sirve para establecer el id del producto
  **/
  private createNewProduct(id: number): ProductoData { 
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
  /**
  * *getProducts
  * TODO: Metodo Improvisado para llamar a TODOS los Productos - Se Debe Refactorizar con la DB
  **/
  getProducts():ProductoData[] {
    return this.productsDB;
  }

  /**
  * *deleteProduct
  * TODO: Metodo Improvisado para Eliminar Datos - Se Debe Refactorizar con la DB
  * @param product: envia el producto completo para eliminarlo de la DB
  **/
  deleteProduct(producto:ProductoData){
    console.log(producto);
    this.productsDB.pop();
  }

  /**
  * * addProduct
  * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
  * @param newProduct: es el nuevo producto para agregarlo a la DB
  **/
  addProduct(newProduct: ProductoData){
    this.productsDB.push(this.createNewProduct(this.productsDB.length+1));
    //this.productsDB.push(newProduct);
  }
}
