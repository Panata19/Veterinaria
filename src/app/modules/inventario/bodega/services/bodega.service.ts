import { Injectable } from '@angular/core';
import { BodegaData, BodegaTable } from '../interfaces/BodegaData';


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
const CATEGORYS = ['Accesorios', 'Electrónica', 'Ropa', 'Fitness'];


@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  productsDB = Array.from({length: 100}, (_, k) => this.convertToData(k + 1))
  //constructor() {}

  /**
  * *createNewBodega
  * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
  * @param id: Sirve para establecer el id del producto
  **/
  private createNewBodega(id: number): BodegaData { 
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
      image: image,
      price: price,
      category: category,
      quantitys: quantitys,
      status: status,
    };
  }

  convertToData(index: number): BodegaTable{
    let NewDatos = { 
      ...this.createNewBodega(index),
      buttons: true
    };
    
    return NewDatos;
  }

  /**
  * *getBodegas
  * TODO: Metodo Improvisado para llamar a TODOS los Bodegaos - Se Debe Refactorizar con la DB
  **/

  getBodegas():BodegaTable[] {
    return this.productsDB;
  }

  /**
  * *deleteBodega
  * TODO: Metodo Improvisado para Eliminar Datos - Se Debe Refactorizar con la DB
  * @param product: envia el producto completo para eliminarlo de la DB
  **/
  deleteBodega(productoEliminar:BodegaData){
    this.productsDB = this.productsDB.filter(item => item.id !== productoEliminar.id );
    return this.productsDB;
  }

  /**
  * * addBodega
  * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
  * @param newBodega: es el nuevo producto para agregarlo a la DB
  **/
  addBodega(newBodega: BodegaData){
    let ListoXTabla = { 
      ...newBodega,
      buttons: true
    };
    this.productsDB.push(ListoXTabla);
  }

  /**
  * * addBodega
  * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
  * @param newBodega: es el nuevo producto para agregarlo a la DB
  **/
  EditBodega(editBodega: BodegaTable){    
    
    // Encuent elra índice del objeto en el array utilizando el ID
    const index = this.productsDB.findIndex(obj => obj.id === editBodega.id);

    if (index !== -1) {
      // Accede al objeto utilizando el índice encontrado
      this.productsDB[index].id = editBodega.id;
      this.productsDB[index].name = editBodega.name;
      this.productsDB[index].status= editBodega.status;
      this.productsDB[index].quantitys= editBodega.quantitys;
      this.productsDB[index].image= editBodega.image;
      this.productsDB[index].price= editBodega.price;
      this.productsDB[index].category= editBodega.category;
      this.productsDB[index].buttons= editBodega.buttons;

      // Realiza las modificaciones necesarias en el objeto
    } else {
      console.log('No se encontró el objeto con el ID especificado');
    }

    return this.productsDB;
  }
}
