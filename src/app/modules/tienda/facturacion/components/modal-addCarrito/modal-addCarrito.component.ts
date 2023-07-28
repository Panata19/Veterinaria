import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Product,
  Detalles,
  CompraData,
  StoreElement,
} from '../../interfaces/CompraProducto';

import { Store } from '@ngrx/store';
import {
  agregarObjeto,
  editarCarrito,
  cambioCarrito,
} from '../../services/app.actions';
import { AppState, Objeto } from '../../services/app.state';

import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';

@Component({
  selector: 'app-modal-Detalles',
  templateUrl: './modal-addCarrito.component.html',
  styleUrls: ['./modal-addCarrito.component.css'],
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
    cantidad: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(this.data.quantitys),
      ],
    ],
  });

  Detalles: Detalles = {
    cantidad: parseInt(this.formAddCarrito.get('cantidad')?.value),
    precio: this.data.price,
    valorIva: 0,
    iva: this.iva,
    precioTotal: 0,
  };

  StoreStado!: Objeto[];

  AddCarrito: StoreElement = {
    enCarrito: false,
    Compra: {
      Producto: this.data,
      Detalles: this.Detalles,
    },
  };

  LiveCarrito: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalAddCarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _formBuilder: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.store
      .select((state) => state.app.objetos)
      .subscribe((objetos) => {
        console.log(objetos);
        this.StoreStado = objetos;

        this.LiveCarrito = this.checkCarrito(this.data.id);
      });
    //** Primer Calculo de Costos **//
    if (this.LiveCarrito) {
      //* Esta en el Carrito
      let index: number = this.StoreStado.findIndex(
        (item) => item.Compra.Producto.id === this.data.id
      );

      this.AddCarrito.enCarrito = this.checkCarrito(this.data.id);

      this.Detalles = { ...this.StoreStado[index].Compra.Detalles };
      this.Detalles = { ...this.StoreStado[index].Compra.Detalles };
      this.AddCarrito.Compra.Detalles = this.Detalles;

      this.formAddCarrito
        .get('cantidad')
        ?.setValue(this.StoreStado[index].Compra.Detalles.cantidad);
    } else if (!this.LiveCarrito) {
      //* Fuera del Carrito
      if (data.quantitys > 0) {
        this.Detalles.precio = data.price;
        this.calcularIva(this.Detalles.precio);
        this.Detalles.precioTotal =
          Math.round((this.Detalles.precio + this.Detalles.valorIva) * 100) /
          100;
      }
    }
  }

  //** Cierra modal sin obtener Datos **//
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  checkCarrito(id: number): boolean {
    return this.StoreStado.some((item) => item.Compra.Producto.id === id);
  }

  aumentar(): void {
    if (this.data.quantitys <= this.formAddCarrito.get('cantidad')?.value) {
      this.label = 'Aumentar';
      this.advertencia();
      return;
    }
    this.AumentarLogica();
  }

  private AumentarLogica() {
    this.Detalles.precio += this.data.price;
    this.formAddCarrito
      .get('cantidad')
      ?.setValue(parseInt(this.formAddCarrito.get('cantidad')?.value) + 1);
    this.Detalles.cantidad = parseInt(
      this.formAddCarrito.get('cantidad')?.value
    );
    this.calcularIva(this.Detalles.precio);
    this.Detalles.precioTotal =
      Math.round((this.Detalles.precio + this.Detalles.valorIva) * 100) / 100;

    this.AddCarrito.Compra.Detalles = this.Detalles;
  }

  disminuir(): void {
    if (this.formAddCarrito.get('cantidad')?.value <= 0) {
      this.label = 'Disminuir';
      this.advertencia();
      return;
    }
    this.DisminuirLogica();
  }

  private DisminuirLogica() {
    //Original
    this.Detalles.precio -= this.data.price;
    this.formAddCarrito
      .get('cantidad')
      ?.setValue(parseInt(this.formAddCarrito.get('cantidad')?.value) - 1);
    this.Detalles.cantidad = parseInt(
      this.formAddCarrito.get('cantidad')?.value
    );
    this.calcularIva(this.Detalles.precio);
    this.Detalles.precioTotal =
      Math.round((this.Detalles.precio + this.Detalles.valorIva) * 100) / 100;

    this.AddCarrito.Compra.Detalles = this.Detalles;
  }

  private advertencia() {
    this.warning = true;
    setTimeout(() => {
      this.warning = false;
      this.label = '';
    }, 3200);
  }

  calcularIva(valor: number, iva: number = this.iva): void {
    const valorIva = (valor * iva) / 100;
    this.Detalles.valorIva = Math.round(valorIva * 100) / 100;
  }

  calcularStateIva(valor: number, iva: number = this.iva): number {
    const valorIva = (valor * iva) / 100;
    return Math.round(valorIva * 100) / 100;
  }

  message(): string {
    return this.label;
  }

  changes(): void {
    if (this.formAddCarrito.get('cantidad')?.value >= this.data.quantitys) {
      this.error = true;
    } else if (this.formAddCarrito.get('cantidad')?.value === '') {
      this.error = true;
    } else {
      this.error = false;

      this.Detalles.cantidad = parseInt(
        this.formAddCarrito.get('cantidad')?.value
      );
      this.Detalles.precio =
        this.data.price * parseInt(this.formAddCarrito.get('cantidad')?.value);
      this.calcularIva(this.Detalles.precio);
      this.Detalles.precioTotal =
        Math.round((this.Detalles.precio + this.Detalles.valorIva) * 100) / 100;

      this.AddCarrito.Compra.Detalles = this.Detalles;
    }
  }

  checkStado(id: number): boolean {
    const objetoEncontrado = this.StoreStado.find(
      (obj) => obj.Compra.Producto.id === id
    );
    return objetoEncontrado ? objetoEncontrado.enCarrito : false;
  }

  encontrarPosicion(): boolean {
    const id = this.data.id;
    const x = this.StoreStado.findIndex((obj) => obj.Compra.Producto.id === id);
    return this.StoreStado[x].enCarrito;
  }

  agregarCarrito() {
    if (this.checkCarrito(this.data.id) === false) {
      this.store.dispatch(cambioCarrito({ id: this.data.id, status: true }));
    }
  }

  actualizarCarrito() {
    this.store.dispatch(
      editarCarrito({
        id: this.data.id,
        enCarrito: this.encontrarPosicion(),
        Detalles: this.AddCarrito.Compra.Detalles,
      })
    );
  }
}
