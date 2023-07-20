import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompraData, CompraPaso1 } from '../../interfaces/CompraProducto';

import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';
import { ClienteService } from 'src/app/modules/cliente/service/cliente.service';
import { TiendaService } from '../../services/tienda.service';


@Component({
  selector: 'app-modal-compra',
  templateUrl: './modal-compra.component.html',
  styleUrls: ['./modal-compra.component.css']
})
export class ModalCompraComponent implements OnInit {
  
  //** Variables Compra **//
  
  iva: number = 12;
  
  compra: CompraPaso1 = {
    cantidadTotal: 1,
    precio: 0,
    valorIva: 0,
    precioTotal: 0,
    iva: this.iva,
  }

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
    cantidad: [this.compra.cantidadTotal, [Validators.required, Validators.min(1)]],
  });

  secondFormGroup = this._formBuilder.group({
    numDoc: [ '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    nombre: [ '', [Validators.required, Validators.maxLength(30)]],
    apellido: [ '', [Validators.required, Validators.maxLength(30)]],
    telefono: [ '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    direccion: [ '', [Validators.required, Validators.maxLength(30)]],  
    correo: [ '', Validators.email],
  });

  CompraData: any = {
    Producto: this.data,
    Cantidad: this.compra,
    user: this.secondFormGroup.value
  }

  thirdFormGroup = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
    direccion: ['', [Validators.required, Validators.maxLength(30)]],  
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    correo: ['', Validators.email],
  });
  

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public dialogRef: MatDialogRef<ModalCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompraData,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private ClienteService: ClienteService,
    private TiendaService: TiendaService
  ) {
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
      this.Clients = this.ClienteService.getCliente();
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
      correo: selection.correo !== '' ? selection.correo : 'No tiene Correo',
    });
    // Obtener todos los Datos  del Cliente
    this.compraCliente = this.secondFormGroup.value;
    console.log(this.compraCliente);
  }

  aumentar(): void {
    if (this.data.quantitys <= this.compra.cantidadTotal) {
      this.label = 'Aumentar';
      this.advertencia();
      return;
    }

    this.compra.precio += this.data.price;
    this.compra.cantidadTotal++;
    this.firstFormGroup.get('cantidad')?.setValue(this.compra.cantidadTotal);
    this.calcularIva(this.compra.precio);
    this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
  }

  disminuir(): void {
    if (this.compra.cantidadTotal <= 0) {
      this.label = 'Disminuir';
      this.advertencia();
      return;
    }
  
    this.compra.precio -= this.data.price;
    this.compra.cantidadTotal--;
    this.firstFormGroup.get('cantidad')?.setValue(this.compra.cantidadTotal);
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
    }else {
      console.log('Falto un dato');

    }
    
  }

  reset(){
    this.compra.cantidadTotal = 1;
    this.compra.precio = this.data.price;
    this.calcularIva(this.compra.precio);
    this.firstFormGroup.get('cantidad')?.setValue(this.compra.cantidadTotal);
    this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
  }

}
