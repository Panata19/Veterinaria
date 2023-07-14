import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CompraData } from '../../interfaces/CompraProducto';

import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['ok', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['ok', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public dialogRef: MatDialogRef<ModalCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompraData,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    //** Primer Calculo de Costos **//
    if(data.quantitys > 0){
      this.precio = data.price;
      this.cantidadTotal = 1;
      this.calcularIva(this.precio);
      this.precioTotal = Math.round((this.precio + this.valorIva)*100) /100 ;
    }
    //** Stepper Responsive **//
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
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
