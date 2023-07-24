import { Injectable } from '@angular/core';
import { ProductoData,   } from '../interfaces/ProductData';
import { CompraPaso1 } from '../interfaces/CompraProducto';
import { estadoStock } from 'src/app/shared/libs/Stock';
import { ClienteService } from 'src/app/modules/cliente/service/cliente.service';
import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';


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

  constructor(private _ClienteService: ClienteService){}
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

  compraProducto({ Producto, Cantidad, Cliente }: {Producto:ProductoData, Cantidad:CompraPaso1, Cliente: any}){
    console.log(Producto);
    this.editProduct(Producto, Cantidad.cantidad);
    this.editCliente(Cliente)
  }

  private editProduct(editProduct: ProductoData, Cantidad: number){     
    // Encuent elra índice del objeto en el array utilizando el ID
    const index = this.productsDB.findIndex(obj => obj.id === editProduct.id);
    // Accede al objeto utilizando el índice encontrado
    if (index !== -1) {
      // Realiza las modificaciones necesarias en el objeto
      this.productsDB[index].quantitys= editProduct.quantitys - Cantidad;
      this.productsDB[index].status = estadoStock(this.productsDB[index].quantitys);
    } else {
      console.log('No se encontró el objeto con el ID especificado');
    }

    return this.productsDB;
  }
  getCliente(): Cliente[]{
    return this._ClienteService.getCliente();
  }

  private deleteProduct(productoEliminar:ProductoData): ProductoData[]{
    this.productsDB = this.productsDB.filter(item => item.id !== productoEliminar.id );
    return this.productsDB;
  }

  private editCliente(Cliente: Cliente): void{
    this._ClienteService.editCliente(Cliente)
  }
}
