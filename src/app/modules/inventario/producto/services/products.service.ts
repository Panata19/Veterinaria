import { Injectable } from '@angular/core';
import { ProductoData, ProductoTable } from '../interfaces/ProductData';
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
  'painted-phone-case.jpg',
];
const CATEGORYS = ['Accesorios', 'Electrónica', 'Ropa', 'Fitness'];

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsDBTable = Array.from({ length: 100 }, (_, k) =>
    this.convertToData(k + 1)
  );
  productsDB = Array.from({ length: 100 }, (_, k) =>
    this.createNewProduct(k + 1)
  );
  //constructor() {}

  /**
   * *createNewProduct
   * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
   * @param id: Sirve para establecer el id del producto
   **/
  private createNewProduct(id: number): ProductoData {
    let name: string =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';
    let image = {
      url:
        '../assets/img/' +
        IMAGE[Math.round(Math.random() * (IMAGE.length - 1))],
      loading: true,
    };

    let price: number = Math.round(Math.random() * 100);
    let quantitys: number = Math.round(Math.random() * 100);
    let category: string =
      CATEGORYS[Math.round(Math.random() * (CATEGORYS.length - 1))];

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

  private convertToData(index: number): ProductoTable {
    let NewDatos = {
      ...this.createNewProduct(index),
      buttons: true,
    };

    return NewDatos;
  }

  /**
   * *getProducts
   * TODO: Metodo Improvisado para llamar a TODOS los Productos - Se Debe Refactorizar con la DB
   **/

  getProductsTable(): ProductoTable[] {
    return this.productsDBTable;
  }

  getProducts(): ProductoData[] {
    return this.productsDB;
  }

  /**
   * *deleteProduct
   * TODO: Metodo Improvisado para Eliminar Datos - Se Debe Refactorizar con la DB
   * @param product: envia el producto completo para eliminarlo de la DB
   **/
  deleteProduct(productoEliminar: ProductoData) {
    this.productsDBTable = this.productsDBTable.filter(
      (item) => item.id !== productoEliminar.id
    );
    return this.productsDBTable;
  }

  /**
   * * addProduct
   * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
   * @param newProduct: es el nuevo producto para agregarlo a la DB
   **/
  addProduct(newProduct: ProductoData) {
    let ListoXTabla = {
      ...newProduct,
      buttons: true,
    };
    this.productsDBTable.push(ListoXTabla);
  }

  /**
   * * addProduct
   * TODO: Metodo Improvisado para llenar Datos - Se Debe Refactorizar con la DB
   * @param newProduct: es el nuevo producto para agregarlo a la DB
   **/
  EditProduct(editProduct: ProductoTable) {
    // Encuent elra índice del objeto en el array utilizando el ID
    const index = this.productsDBTable.findIndex(
      (obj) => obj.id === editProduct.id
    );

    if (index !== -1) {
      // Accede al objeto utilizando el índice encontrado
      this.productsDBTable[index].id = editProduct.id;
      this.productsDBTable[index].name = editProduct.name;
      this.productsDBTable[index].stock = editProduct.stock;
      this.productsDBTable[index].quantitys = editProduct.quantitys;
      this.productsDBTable[index].image = editProduct.image;
      this.productsDBTable[index].price = editProduct.price;
      this.productsDBTable[index].category = editProduct.category;
      this.productsDBTable[index].buttons = editProduct.buttons;

      // Realiza las modificaciones necesarias en el objeto
    } else {
      console.log('No se encontró el objeto con el ID especificado');
    }

    return this.productsDBTable;
  }
}
