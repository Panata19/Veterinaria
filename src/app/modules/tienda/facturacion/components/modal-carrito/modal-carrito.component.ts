
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Product, Detalles } from '../../interfaces/CompraProducto';

import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';
import { TiendaService } from '../../services/tienda.service';
import { Store } from '@ngrx/store';
import { AppState, Objeto } from '../../services/app.state';


@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.component.html',
  styleUrls: ['./modal-carrito.component.css']
})
export class ModalCarritoComponent implements OnInit{
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
  
  public Imgs = {
    url: "../assets/img/brown-purse.jpg", 
    loading: false,
  }

  public Carrito!: Objeto[];

  //** Variables para Forms  **//
  firstFormGroup = this._formBuilder.group({
    cantidad: [1, [Validators.required, Validators.min(1)]],
  });
  /*
  DetallesFactura = {
    cantidad: this.Carrito[0].Compra.Detalles.cantidad,
    precio: this.Carrito[0].Compra.Producto.price,
    valorIva: 0,
    iva: this.iva,
    precioTotal: 0,
  }*/

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

  stepperOrientation: Observable<StepperOrientation>;
  /*
  CompraData: any = {
    Producto: this.Carrito[0].Compra.Producto,
    Cantidad: this.compra,
    user: this.secondFormGroup.value
  }*/
  StoreStado!: Objeto[];

  constructor(
    public dialogRef: MatDialogRef<ModalCarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private TiendaService: TiendaService,
    private store: Store<{ app: AppState }>
  ) {
    this.store
      .select((state) => state.app.objetos)
      .subscribe((objetos) => {
        console.log(objetos);
        this.StoreStado = objetos;
      });

    //** Primer Calculo de Costos **//
    /*if(this.Carrito[0].Compra.Producto.quantitys > 0){
      this.compra.precio = this.Carrito[0].Compra.Producto.price;
      //this.calcularIva(this.compra.precio);
      this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva)*100) /100 ;
    }*/
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
    this.Carrito = this.StoreStado;
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
    if(!this.secondFormGroup.valid || !this.thirdFormGroup.valid){
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
    
    //this.compra.cantidad = this.firstFormGroup.get('cantidad')?.value;

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

  aumentar({cantidad, precio, iva, valorIva ,precioTotal } : Detalles, {price} : Product): void {
    if (this.Carrito[0].Compra.Producto.quantitys <= cantidad) {
      this.label = 'Aumentar';
      this.advertencia();
      return;
    }
    ++cantidad;
    precio += price;

    const calcIva = (precio * iva) / 100;
    valorIva = Math.round(calcIva * 100) / 100;
    
    precioTotal = Math.round((precio + valorIva) * 100) / 100;
  }

  disminuir({cantidad, precio, iva, valorIva ,precioTotal } : Detalles, {price} : Product): void {
    if (cantidad <= 0) {
      this.label = 'Disminuir';
      this.advertencia();
      return;
    }
    
    cantidad--
    precio -= price

    const calcIva = (precio * iva) / 100;
    valorIva = Math.round(calcIva * 100) / 100;
    
    precioTotal = Math.round((precio + valorIva) * 100) / 100;
    
    //this.compra.precio -= this.newData.price;
    //this.firstFormGroup.get('cantidad')?.setValue(
    //  parseInt(this.firstFormGroup.get('cantidad')?.value) -1);
    //this.calcularIva(this.compra.precio);
    //this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
  }
  

  private advertencia(){
      this.warning = true;
      setTimeout(()=> {
        this.warning = false
        this.label = '';
      }, 3200);
  }

  message(): string {
    return this.label;
  }

  comprar(){
    /*
    if(this.CompraData?.Producto && this.CompraData?.Cantidad && this.CompraData?.user){
      console.log(this.CompraData)
      this.TiendaService.compraProducto(this.CompraData);
    }else {
      console.log('Falto un dato');
    }
    */
  }

  reset(){
    this.searchTerm.setValue('');
    //this.compra.precio = this.newData.price;
    //this.calcularIva(this.compra.precio);
    //this.firstFormGroup.get('cantidad')?.setValue(1)
    //this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
  }

  changes({cantidad, precio, iva, valorIva ,precioTotal } : Detalles, {price, quantitys} : Product): void {
    if(cantidad >= quantitys) {
      this.error = true;
    } else {
      this.error = false;
      
      precio = cantidad * price;

      const calcIva = (precio * iva) / 100;
      valorIva = Math.round(calcIva * 100) / 100;
      
      precioTotal = Math.round((precio + valorIva) * 100) / 100;

      //this.compra.precio = this.newData.price * parseInt(this.firstFormGroup.get('cantidad')?.value);
      //this.calcularIva(this.compra.precio);
      //this.compra.precioTotal = Math.round((this.compra.precio + this.compra.valorIva) * 100) / 100;
    }
  }

  loadingImage(loading: boolean): void {  loading = false;    }

}
