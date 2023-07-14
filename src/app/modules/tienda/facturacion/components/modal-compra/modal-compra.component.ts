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
      this.precioTotal = Math.round((this.precio + this.valorIva)*100) /100 ;
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
      this.precioTotal = Math.round(this.precio + this.valorIva * 100) / 100;
      console.log(this.precioTotal)
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
      this.precioTotal = Math.round(this.precio + this.valorIva * 100) / 100;
      console.log(this.precioTotal)
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

  calcularIva( valor: number, iva: number = this.iva): void{
    const valorIva = (valor * iva) / 100;
    this.valorIva = Math.round(valorIva * 100) / 100;
  }

  message(): string {
    return this.label;
  }

  comprar(){

  }

}
