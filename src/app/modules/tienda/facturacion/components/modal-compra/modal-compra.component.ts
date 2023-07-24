import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { CompraData, CompraPaso1 } from '../../interfaces/CompraProducto';

import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';
import { TiendaService } from '../../services/tienda.service';


@Component({
  selector: 'app-modal-compra',
  templateUrl: './modal-compra.component.html',
  styleUrls: ['./modal-compra.component.css']
})
export class ModalCompraComponent implements OnInit {
  
  //** Variables Compra **//
  
  iva: number = 12;
  error: boolean = false;

  compraCliente!: Cliente;

  warning: boolean = false;
  label: string = '';
  labelToolTip: string = 'Completa los pasos primero';

  //** Variables para filtrar **//
  
  searchTerm = new FormControl('');
  Clients: Cliente[] = []; 
  filteredClients!: Observable<Cliente[]>;
  

  //** Variables para Forms  **//
  firstFormGroup = this._formBuilder.group({
    cantidad: [1, [Validators.required, Validators.min(1), Validators.max(this.data.quantitys)]],
  });
  
  compra: CompraPaso1 = {
    cantidad: this.firstFormGroup.get('cantidad')?.value,
    precio: this.data.price,
    valorIva: 0,
    iva: this.iva,
    precioTotal: 0,
  }

  secondFormGroup = this._formBuilder.group({
    numDoc: [ '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    nombre: [ '', [Validators.required, Validators.maxLength(30)]],
    apellido: [ '', [Validators.required, Validators.maxLength(30)]],
    telefono: [ '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    direccion: [ '', [Validators.required, Validators.maxLength(30)]],  
    correo: [ '', Validators.email],
  });

  thirdFormGroup = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
    direccion: ['', [Validators.required, Validators.maxLength(30)]],  
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    correo: ['', Validators.email],
  });

  CompraData: any = {
    Producto: this.data,
    Cantidad: this.compra,
    user: this.secondFormGroup.value
  }

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public dialogRef: MatDialogRef<ModalCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompraData,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private TiendaService: TiendaService
  ) {
    console.log(this.data.quantitys)
    //** Primer Calculo de Costos **//
    if(data.quantitys > 0){
      this.compra.precio = data.price;
      this.calcularIva(this.compra.precio);
      this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva)*100) /100 ;
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

  onStepChange(event: any): void {
    //** Paso 2 **//
    if (event.selectedIndex === 1) {
      //** Llamar Clientes **//
      this.Clients = this.TiendaService.getCliente();
    }
    if(!this.firstFormGroup.valid || !this.secondFormGroup.valid || !this.thirdFormGroup.valid){
      this.labelToolTip = 'Completa los pasos primero';
    } else {
      this.labelToolTip = 'Listo para comprar';
    }
    // Establecer nuevos valores en el formulario
    this.thirdFormGroup.patchValue({
      nombre: this.secondFormGroup.get('nombre')?.value+' '+this.secondFormGroup.get('apellido')?.value,
      direccion: this.secondFormGroup.get('direccion')?.value,
      telefono: this.secondFormGroup.get('telefono')?.value,
      correo: this.secondFormGroup.get('correo')?.value
    });
    this.thirdFormGroup.get('nombre')?.setValue(
      this.secondFormGroup.get('nombre')?.value+' '+
      this.secondFormGroup.get('apellido')?.value);
    this.thirdFormGroup.get('direccion')?.setValue(
      this.secondFormGroup.get('direccion')?.value);
    this.thirdFormGroup.get('telefono')?.setValue(
      this.secondFormGroup.get('telefono')?.value);
    this.thirdFormGroup.get('correo')?.setValue(
      this.secondFormGroup.get('correo')?.value);
    
  }
  // Establecer nuevos valores del Cliente Seleccionado
  selecction(selection: Cliente): void{  
    this.secondFormGroup.setValue({
      numDoc: selection.numDocumento ,
      nombre: selection.nombreCliente,
      apellido: selection.apellidosCliente,
      telefono: selection.telefono,
      direccion: selection.direccion,
      correo: selection.correo,
    });
    // Obtener todos los Datos  del Cliente
    this.compraCliente = this.secondFormGroup.value;
  }

  aumentar(): void {
    if (this.data.quantitys <= this.firstFormGroup.get('cantidad')?.value) {
      this.label = 'Aumentar';
      this.advertencia();
      return;
    }

    this.compra.precio += this.data.price;
    this.firstFormGroup.get('cantidad')?.setValue(
      parseInt(this.firstFormGroup.get('cantidad')?.value) +1);
    this.calcularIva(this.compra.precio);
    this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
  }

  disminuir(): void {
    if (this.firstFormGroup.get('cantidad')?.value <= 0) {
      this.label = 'Disminuir';
      this.advertencia();
      return;
    }
  
    this.compra.precio -= this.data.price;
    this.firstFormGroup.get('cantidad')?.setValue(
      parseInt(this.firstFormGroup.get('cantidad')?.value) -1);
    this.calcularIva(this.compra.precio);
    this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
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
    this.compra.valorIva = Math.round(valorIva * 100) / 100;
  }

  message(): string {
    return this.label;
  }

  comprar(){
    if(this.CompraData?.Producto && this.CompraData?.Cantidad && this.CompraData?.user){
      console.log(this.CompraData)
      this.TiendaService.compraProducto(this.CompraData);
    }else {
      console.log('Falto un dato');
    }
    
  }

  reset(){
    this.searchTerm.setValue('');
    this.compra.precio = this.data.price;
    this.calcularIva(this.compra.precio);
    this.firstFormGroup.get('cantidad')?.setValue(1)
    this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
  }

  changes(): void{
    if(this.firstFormGroup.get('cantidad')?.value >= this.data.quantitys) {
      this.error = true;
    } else if(this.firstFormGroup.get('cantidad')?.value === '') {
      this.error = true;
    } else {
      this.error = false;

      this.compra.precio = this.data.price * parseInt(this.firstFormGroup.get('cantidad')?.value);
      this.calcularIva(this.compra.precio);
      this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
    }
  }

}
