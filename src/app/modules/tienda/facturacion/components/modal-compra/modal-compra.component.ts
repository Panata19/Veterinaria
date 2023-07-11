import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraData } from '../../interfaces/CompraProducto';

@Component({
  selector: 'app-modal-compra',
  templateUrl: './modal-compra.component.html',
  styleUrls: ['./modal-compra.component.css']
})
export class ModalCompraComponent implements OnInit {
  
  cantidadTotal!: number;
  precio!: number;
  valorIva!: number;
  precioTotal!: number;
  iva: number = 12;
  numero = 100
  
  warning: boolean = false;
  label: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompraData,
  ) {
    if(data.quantitys > 0){
      this.precio = data.price;
      this.cantidadTotal = 1;
      this.calcularIva(this.precio);
      this.precioTotal = this.precio + this.valorIva;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { 
  }

  aumentar(): void{
    if(this.data.quantitys > this.cantidadTotal ){
      this.precio = this.precio + this.data.price;
      this.cantidadTotal = this.cantidadTotal + 1;
      this.calcularIva(this.precio);
      this.precioTotal = this.precio + this.valorIva;

    } else {
      this.advertencia();
      this.label = 'Aumentar';
    }
  }

  disminuir(): void{
    if(this.cantidadTotal > 0 ){
      this.precio = this.precio - this.data.price;
      this.cantidadTotal = this.cantidadTotal - 1;
      this.calcularIva(this.precio);
      this.precioTotal = this.precio + this.valorIva;
      this.precioTotal = Math.round(this.precioTotal * 100) / 100;

    } else {
      this.advertencia();
      this.label = 'Disminuir';
    }
  }

  private advertencia(){
      this.warning = true;
      setTimeout(()=> {
        this.warning = false
        this.label = '';
      }, 4200);
  }

  calcularIva( valor: number ): void{
    this.valorIva = (valor * this.iva) / 100;
    this.valorIva = Math.round(this.valorIva * 100) / 100;
  }

  message(): string {
    return this.label;
  }

  comprar(){

  }

}
