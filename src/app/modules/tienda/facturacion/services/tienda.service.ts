import { Injectable } from '@angular/core';
import { MetodoPago, StoreProduct } from '../interfaces/CompraProducto';
import { Detalles } from '../interfaces/CompraProducto';
import { estadoStock } from 'src/app/shared/libs/Stock';
import { ClienteService } from 'src/app/modules/cliente/service/cliente.service';
import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';
import { ProductsService } from 'src/app/modules/inventario/producto/services/products.service';


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

//** Simulando Datos de la DB **//
const MetodPago: MetodoPago[] = [
  { id: 1, nombre: 'Efectivo' },
  { id: 2, nombre: 'Tarjeta Debito' },
  { id: 3, nombre: 'Tarjeta Credito' },
  { id: 6, nombre: 'Cheque' },
];


@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private productsDB = this._ProductsService.getProducts();

  constructor(private _ClienteService: ClienteService, private _ProductsService: ProductsService){}

  getProducts():StoreProduct[] {
    return this.productsDB;
  }

  compraProducto({ Producto, Cantidad, Cliente }: {Producto:StoreProduct, Cantidad:Detalles, Cliente: any}){
    this.editProduct(Producto, Cantidad.cantidad);
    console.log(Cantidad.cantidad)
    this.editCliente(Cliente)
  }

  private editProduct(editProduct: StoreProduct, Cantidad: number){     
    // Encuent elra índice del objeto en el array utilizando el ID
    const index = this.productsDB.findIndex(obj => obj.id === editProduct.id);
    // Accede al objeto utilizando el índice encontrado
    if (index !== -1) {
      // Realiza las modificaciones necesarias en el objeto
      console.log(this.productsDB[index])
      this.productsDB[index].quantitys = editProduct.quantitys - Cantidad;
      this.productsDB[index].stock = estadoStock(this.productsDB[index].quantitys);
    } else {
      console.log('No se encontró el objeto con el ID especificado');
    }

    return this.productsDB;
  }
  
  getCliente(): Cliente[]{
    return this._ClienteService.getCliente();
  }

  getMetodPagos(): MetodoPago[]{
    return MetodPago;
  }

  private deleteProduct(productoEliminar:StoreProduct): StoreProduct[]{
    this.productsDB = this.productsDB.filter(item => item.id !== productoEliminar.id );
    return this.productsDB;
  }

  private editCliente(Cliente: Cliente): void{
    this._ClienteService.editCliente(Cliente)
  }
}
