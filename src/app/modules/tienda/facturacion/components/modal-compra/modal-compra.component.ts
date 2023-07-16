import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompraData } from '../../interfaces/CompraProducto';

import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';
import { ClienteService } from 'src/app/modules/cliente/service/cliente.service';


@Component({
  selector: 'app-modal-compra',
  templateUrl: './modal-compra.component.html',
  styleUrls: ['./modal-compra.component.css']
})
export class ModalCompraComponent implements OnInit {
  
  cantidadTotal: number = 1;
  precio!: number;
  valorIva!: number;
  precioTotal!: number;
  iva: number = 12;
  numero = 100

  warning: boolean = false;
  label: string = '';

  //** Variables para filtrar **//
  
  searchTerm = new FormControl('');
  Clients: Cliente[] = []; 
  filteredClients!: Observable<Cliente[]>;
  

  //** Variables para Forms  **//
  firstFormGroup = this._formBuilder.group({
    cantidad: [this.cantidadTotal, [Validators.required, Validators.min(1)]],
  });

  secondFormGroup = this._formBuilder.group({
    numDoc: [ '', [Validators.pattern('^[0-9]{10}$')]],
    nombre: [ '', [Validators.maxLength(30)]],
    apellido: [ '', [Validators.maxLength(30)]],
    telefono: [ '', [Validators.pattern('^[0-9]{10}$')]],
    direccion: [ '', [Validators.maxLength(30)]],  
    correo: [ '', Validators.email],
  });

  

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['ok', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public dialogRef: MatDialogRef<ModalCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompraData,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    public ClienteService: ClienteService
  ) {
    //** Primer Calculo de Costos **//
    if(data.quantitys > 0){
      this.precio = data.price;
      this.calcularIva(this.precio);
      this.precioTotal = Math.round((this.precio + this.valorIva)*100) /100 ;
    }
    //** Stepper Responsive **//
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  
  //** Cierra modal sin obtener Datos **//
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { 
    this.filteredClients = this.searchTerm.valueChanges.pipe(
      startWith(''),
      map(value => {
        let resp = this._filter(value || '');
        return resp;
      }),
    );
  }

  //** Metodo para filtrar los Clientes **//
  private _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();

    return this.Clients.filter(Cliente => {
      const userNameMatch = Cliente.nombreCliente.toLowerCase().includes(filterValue);
      const apellidoMatch = Cliente.apellidosCliente.toLowerCase().includes(filterValue);
      const idMatch = Cliente?.id === parseInt(filterValue);

      return userNameMatch || apellidoMatch || idMatch;
    });
  }

  onStepChange(event: any) {
    //** Paso 2 **//
    if (event.selectedIndex === 1) {
      //** Llamar Clientes **//
      this.Clients = this.ClienteService.getCliente();
    }
  }

  selecction(selection: Cliente): void{
    console.log(selection, "Seleccion");

    // Establecer nuevos valores en los formularios utilizando setValue()
    this.secondFormGroup.setValue({
      numDoc: selection.numDocumento ,
      nombre: selection.nombreCliente,
      apellido: selection.apellidosCliente,
      telefono: selection.telefono,
      direccion: selection.direccion,
      correo: selection.correo,
    });
  }

  aumentar(): void{
    if(this.data.quantitys > this.cantidadTotal ){
      this.precio = this.precio + this.data.price;
      this.cantidadTotal = this.cantidadTotal + 1;
      this.firstFormGroup.get('cantidad')?.setValue(this.cantidadTotal);
      this.calcularIva(this.precio);
      this.precioTotal = Math.round((this.precio + this.valorIva) * 100) / 100;
    } else {
      this.advertencia();
      this.label = 'Aumentar';
    }
  }

  disminuir(): void{
    if(this.cantidadTotal > 0 ){
      this.precio = this.precio - this.data.price;
      this.cantidadTotal = this.cantidadTotal - 1;
      this.firstFormGroup.get('cantidad')?.setValue(this.cantidadTotal);
      this.calcularIva(this.precio);
      this.precioTotal = Math.round((this.precio + this.valorIva) * 100) / 100;
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

  reset(){
    this.cantidadTotal = 1;
    this.precio = this.data.price;
    this.calcularIva(this.precio);
    this.firstFormGroup.get('cantidad')?.setValue(this.cantidadTotal);
    this.precioTotal = Math.round((this.precio + this.valorIva) * 100) / 100;
  }

}
