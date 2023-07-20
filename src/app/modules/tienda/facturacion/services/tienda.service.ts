import { Injectable } from '@angular/core';
import { ProductoData,   } from '../interfaces/ProductData';


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

  private createNewProduct(id: number): ProductoData { 
    let name:string =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';
    let image = {
      url: '../assets/img/'+IMAGE[Math.round(Math.random() * (IMAGE.length - 1))],
      loading: true
    };
    let status: string;
    let price: number = Math.round(Math.random() * 100);
    let quantitys:number = Math.round(Math.random() * 100);
    let category: string = CATEGORYS[Math.round(Math.random() * (CATEGORYS.length - 1))];

    switch (true) {
      case quantitys > 10:
        status = 'DISPONIBLE';
        break;
      case quantitys > 0 && quantitys <= 10:
        status = 'BAJO STOCK';
        break;
      case quantitys === 0:
        status = 'AGOTADO';
        break;
      default:
        status = 'UNKNOWN';
        break;
    }

    return {
      id: id,
      name: name,
      image: image,
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

  compraProdutcto(Producto: ProductoData){
    console.log(Producto);
    this.EditProduct(Producto, 1);

  }

  private EditProduct(editProduct: ProductoData, Quantitys: number){     
    // Encuent elra índice del objeto en el array utilizando el ID
    const index = this.productsDB.findIndex(obj => obj.id === editProduct.id);

    if (index !== -1) {
      // Accede al objeto utilizando el índice encontrado
      switch (true) {
        case editProduct.quantitys > 10:
          editProduct.status = 'IN STOCK';
          break;
        case editProduct.quantitys > 0 && editProduct.quantitys <= 10:
          editProduct.status = "LOW STOCK";
          break;
        case editProduct.quantitys === 0:
          editProduct.status = "OUT OF STOCK"
          break;
        default:
          editProduct.status = "UNKNOWN"
          break;
      }

      this.productsDB[index].status = editProduct.status;
      this.productsDB[index].quantitys= editProduct.quantitys - Quantitys;
      // Realiza las modificaciones necesarias en el objeto
    } else {
      console.log('No se encontró el objeto con el ID especificado');
    }

    return this.productsDB;
  }

  private deleteProduct(productoEliminar:ProductoData){
    this.productsDB = this.productsDB.filter(item => item.id !== productoEliminar.id );
    return this.productsDB;
  }

}
