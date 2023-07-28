import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Product, Detalles, CompraData } from '../../interfaces/CompraProducto';

import { Store } from '@ngrx/store';
import { agregarObjeto, cambiarPrecio, eliminarObjeto } from '../../services/app.actions';
import { AppState, Objeto } from '../../services/app.state';

import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';
import { TiendaService } from '../../services/tienda.service';


@Component({
  selector: 'app-modal-Detalles',
  templateUrl: './modal-addCarrito.component.html',
  styleUrls: ['./modal-addCarrito.component.css']
})
export class ModalAddCarritoComponent implements OnInit {
  
  //** Variables Compra **//
  
  iva: number = 12;
  error: boolean = false;

  compraCliente!: Cliente;

  warning: boolean = false;
  label: string = '';
  labelToolTip: string = 'Completa los pasos primero';
  

  //** Variables para Forms  **//
  formAddCarrito = this._formBuilder.group({
    cantidad: [1, [Validators.required, Validators.min(1), Validators.max(this.data.quantitys)]],
  });
  
  Detalles: Detalles = {
    cantidad: parseInt(this.formAddCarrito.get('cantidad')?.value),
    precio: this.data.price,
    valorIva: 0,
    iva: this.iva,
    precioTotal: 0,
  }

  StoreStado!: Objeto[];
  
  Compra: CompraData ={
    Producto: this.data,
    Detalles: this.Detalles
  }

  AddCarrito = {
    agregarCarrito: true,
    Compra: this.Compra
  }

  LiveCarrito: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalAddCarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _formBuilder: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.store.select(state => state.app.objetos).subscribe(objetos => {
      console.log(objetos);
      this.StoreStado = objetos;
      this.AddCarrito.agregarCarrito = !this.checkCarrito(this.StoreStado, this.data.id);
      this.LiveCarrito = this.checkCarrito(this.StoreStado, this.data.id);
    });
    if(this.LiveCarrito){
      let index: number = this.StoreStado.findIndex(item => item.Producto.id === this.data.id);
      this.Detalles = {...this.StoreStado[index].Detalles};
      this.formAddCarrito.get('cantidad')?.setValue(this.StoreStado[index].Detalles.cantidad);
    } else if(!this.LiveCarrito){
      //** Primer Calculo de Costos **//
      if(data.quantitys > 0){
        this.Detalles.precio = data.price;
        this.calcularIva(this.Detalles.precio);
        this.Detalles.precioTotal = Math.round((this.Detalles.precio + this.Detalles.valorIva)*100) /100 ;
      }
    }
  }
  
  //** Cierra modal sin obtener Datos **//
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  checkCarrito(array: any[], id: number): boolean {
    return array.some(item => item.Producto.id === id);
  }

  aumentar(): void {
    if (this.data.quantitys <= this.formAddCarrito.get('cantidad')?.value) {
      this.label = 'Aumentar';
      this.advertencia();
      return;
    }
    this.AumentarLogica();
    /** 
    if(this.AddCarrito.agregarCarrito){//Añade cuando aun no esta en el Carrito
      this.AumentarLogica();
    } else if(!this.AddCarrito.agregarCarrito){ //Actualiza cuando esta en el Carrito
      
      let StateDetalles = this.AumentarState();
      this.store.dispatch(cambiarPrecio({ id: this.data.id, detalles: StateDetalles }));
    }
    */
   
  }

  private AumentarLogica(){
    //Original
    this.Detalles.precio += this.data.price;
    this.formAddCarrito.get('cantidad')?.setValue(
      parseInt(this.formAddCarrito.get('cantidad')?.value) +1);
    this.Detalles.cantidad = parseInt(this.formAddCarrito.get('cantidad')?.value);
    this.calcularIva(this.Detalles.precio);
    this.Detalles.precioTotal = Math.round((this.Detalles.precio + this.Detalles.valorIva) * 100) / 100;
    
    this.Compra.Detalles = this.Detalles;
  }

  private AumentarState(): Detalles{
    this.Detalles.precio += this.data.price;
    let index: number = this.StoreStado.findIndex(item => item.Producto.id === this.data.id);
    // parseInt(this.formAddCarrito.get('cantidad')?.value),
    let StateCosto = this.StoreStado[index].Detalles.precio + this.data.price;
    let StateIva = this.calcularStateIva(StateCosto,this.iva);
    let StateCantidad = this.StoreStado[index].Detalles.cantidad;
    
    let StateDetalles: Detalles = {
      cantidad: StateCantidad + 1,
      precio: StateCosto,
      valorIva: StateIva,
      iva: this.iva,
      precioTotal: Math.round((StateCosto + StateIva) * 100) / 100,
    }
    return StateDetalles;
  }

  disminuir(): void {
    if (this.formAddCarrito.get('cantidad')?.value <= 0) {
      this.label = 'Disminuir';
      this.advertencia();
      return;
    }
    this.DisminuirLogica();
    /*
    if(this.AddCarrito.agregarCarrito) {
      this.DisminuirLogica();
    } else if(!this.AddCarrito.agregarCarrito) {
      let StateDetalles = this.DisminuirState();
      this.store.dispatch(cambiarPrecio({ id: this.data.id, detalles: StateDetalles }));
    }
    */
  }

  private DisminuirLogica(){
    //Original
    this.Detalles.precio -= this.data.price;
    this.formAddCarrito.get('cantidad')?.setValue(
      parseInt(this.formAddCarrito.get('cantidad')?.value) -1);
    this.Detalles.cantidad = parseInt(this.formAddCarrito.get('cantidad')?.value);
    this.calcularIva(this.Detalles.precio);
    this.Detalles.precioTotal = Math.round((this.Detalles.precio + this.Detalles.valorIva) * 100) / 100;

    this.Compra.Detalles = this.Detalles;
  }

  private DisminuirState(): Detalles{
    let index: number = this.StoreStado.findIndex(item => item.Producto.id === this.data.id);
    // parseInt(this.formAddCarrito.get('cantidad')?.value),
    let price = this.StoreStado[index].Detalles.precio;
    let StateCosto = price - this.data.price;
    let StateIva = this.calcularStateIva(StateCosto,this.iva);
    let StateCantidad = this.StoreStado[index].Detalles.cantidad;
    
    let StateDetalles: Detalles = {
      cantidad: StateCantidad - 1,
      precio: StateCosto,
      valorIva: StateIva,
      iva: this.iva,
      precioTotal: Math.round((StateCosto + StateIva) * 100) / 100,
    }
    return StateDetalles;
  }

  private advertencia(){
      this.warning = true;
      setTimeout(()=> {
        this.warning = false
        this.label = '';
      }, 3200);
  }

  calcularIva( valor: number, iva: number = this.iva): void{
    const valorIva = (valor * iva) / 100;
    this.Detalles.valorIva = Math.round(valorIva * 100) / 100;
  }

  calcularStateIva( valor: number, iva: number = this.iva): number{
    const valorIva = (valor * iva) / 100;
    return Math.round(valorIva * 100) / 100;
  }

  message(): string {
    return this.label;
  }

  changes(): void{
    if(this.formAddCarrito.get('cantidad')?.value >= this.data.quantitys) {
      this.error = true;
    } else if(this.formAddCarrito.get('cantidad')?.value === '') {
      this.error = true;
    } else {
      this.error = false;
      this.AddCarrito.Compra = this.Compra;
      
      this.Detalles.cantidad = parseInt(this.formAddCarrito.get('cantidad')?.value);
      this.Detalles.precio = this.data.price * parseInt(this.formAddCarrito.get('cantidad')?.value);
      this.calcularIva(this.Detalles.precio);
      this.Detalles.precioTotal = Math.round((this.Detalles.precio + this.Detalles.valorIva) * 100) / 100;
    }
  }

  ActualziarCarrito(){

  }

}
