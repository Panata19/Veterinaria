import { Injectable } from '@angular/core';
import { SuministroData, SuministroTable } from '../interfaces/SuministroData';
import { estadoStock } from 'src/app/shared/libs/Stock';


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
export class SuministroService {

  productsDB = Array.from({length: 100}, (_, k) => this.convertToData(k + 1))
  //constructor() {}

  /**
  * *createNewSuministro
  * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
  * @param id: Sirve para establecer el id del producto
  **/
  private createNewSuministro(id: number): SuministroData { 
    let name:string =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';
    let image = {
      url: '../assets/img/'+IMAGE[Math.round(Math.random() * (IMAGE.length - 1))],
      loading: true
    };

    let price: number = Math.round(Math.random() * 100);
    let quantitys:number = Math.round(Math.random() * 100);
    let category: string = CATEGORYS[Math.round(Math.random() * (CATEGORYS.length - 1))];

    return {
      id: id,
      name: name,
      image: image,
      price: price,
      category: category,
      quantitys: quantitys,
      stock: estadoStock(quantitys),
    };
  }

  private convertToData(index: number): SuministroTable{
    let NewDatos = { 
      ...this.createNewSuministro(index),
      buttons: true
    };
    
    return NewDatos;
  }

  /**
  * *getSuministros
  * TODO: Metodo Improvisado para llamar a TODOS los Suministros - Se Debe Refactorizar con la DB
  **/
  getSuministros():SuministroTable[] {
    return this.productsDB;
  }

  /**
  * *deleteSuministro
  * TODO: Metodo Improvisado para Eliminar Datos - Se Debe Refactorizar con la DB
  * @param product: envia el producto completo para eliminarlo de la DB
  **/
  deleteSuministro(productoEliminar:SuministroData){
    this.productsDB = this.productsDB.filter(item => item.id !== productoEliminar.id );
    return this.productsDB;
  }

  /**
  * * addSuministro
  * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
  * @param newSuministro: es el nuevo producto para agregarlo a la DB
  **/
  addSuministro(newSuministro: SuministroData){
    let ListoXTabla = { 
      ...newSuministro,
      buttons: true
    };
    this.productsDB.push(ListoXTabla);
  }

  /**
  * * addSuministro
  * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
  * @param newSuministro: es el nuevo producto para agregarlo a la DB
  **/
  EditSuministro(editSuministro: SuministroTable){    
    
    // Encuent elra índice del objeto en el array utilizando el ID
    const index = this.productsDB.findIndex(obj => obj.id === editSuministro.id);

    if (index !== -1) {
      // Accede al objeto utilizando el índice encontrado
      this.productsDB[index].id = editSuministro.id;
      this.productsDB[index].name = editSuministro.name;
      this.productsDB[index].stock= editSuministro.stock;
      this.productsDB[index].quantitys= editSuministro.quantitys;
      this.productsDB[index].image= editSuministro.image;
      this.productsDB[index].price= editSuministro.price;
      this.productsDB[index].category= editSuministro.category;
      this.productsDB[index].buttons= editSuministro.buttons;

      // Realiza las modificaciones necesarias en el objeto
    } else {
      console.log('No se encontró el objeto con el ID especificado');
    }

    return this.productsDB;
  }
}
