
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Product, Detalles, StoreElement } from '../../interfaces/CompraProducto';

import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Cliente } from 'src/app/modules/cliente/interface/cliente.interface';
import { TiendaService } from '../../services/tienda.service';
import { Store } from '@ngrx/store';
import { AppState, Objeto } from '../../services/app.state';
import { cambioCantidadCarrito, eliminarObjeto } from '../../services/app.actions';


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

  //** Variables para Forms  **//
  firstFormGroup = this._formBuilder.group({
    cantidad: [1, [Validators.required, Validators.min(1)]],
  });
  /*
  DetallesFactura = {
    cantidad: this.StoreStado[0].Compra.Detalles.cantidad,
    subTotal: this.StoreStado[0].Compra.Producto.price,
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
    Producto: this.StoreStado[0].Compra.Producto,
    Cantidad: this.compra,
    user: this.secondFormGroup.value
  }*/
  public StoreStado!: Objeto[];
  formStep1: FormGroup = this._formBuilder.group({});

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
        
        this.StoreStado = [...objetos];
       
        if (this.StoreStado.length === 0) {
          if(this.formStep1.contains('Error')){
            this.formStep1.removeControl('Error');
          } else {
            const control = new FormControl(50);
            control.setValidators([
              Validators.max(2),
            ]);
            this.formStep1.addControl('Error', control);
          }
        }
      });
      
    
    
    this.StoreStado.forEach((dato: StoreElement, index: number) => {
      const control = new FormControl(dato.Compra.Detalles.cantidad);
        control.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(dato.Compra.Producto.quantitys),
        ]);
        this.formStep1.addControl('cantidad_'+index, control);
    });

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

  aumentar({cantidad, subTotal, iva, valorIva ,precioTotal } : Detalles, {id, quantitys, price} : Product, i: number): void {
    const value: number = parseInt(this.formStep1.get('cantidad_'+i)?.value);
    this.formStep1.get('cantidad_'+i)?.setValue(value + 1 );
    if ( quantitys < value || value <= 0 ) {
      this.label = 'Aumentar';
      this.advertencia();
      return;
    }
    cantidad = value;
    subTotal += price;
    valorIva = this.logicaIva(subTotal, iva);
    precioTotal = Math.round((subTotal + valorIva) * 100) / 100;

    this.store.dispatch(
      cambioCantidadCarrito({ id, Detalles: {cantidad, subTotal, iva, valorIva, precioTotal} })
    );
  }

  disminuir({cantidad, subTotal, iva, valorIva ,precioTotal } : Detalles, {id, quantitys, price} : Product, i: number): void {
    const value: number = parseInt(this.formStep1.get('cantidad_'+i)?.value);
    this.formStep1.get('cantidad_'+i)?.setValue(value - 1 );

    if (value <= 0 || quantitys < value) {
      this.label = 'Disminuir';
      this.advertencia();
      return;
    }
    cantidad = value;
    subTotal -= price
    valorIva = this.logicaIva(subTotal, iva);
    precioTotal = Math.round((subTotal + valorIva) * 100) / 100;

    this.store.dispatch(
      cambioCantidadCarrito({ id, Detalles: {cantidad, subTotal, iva, valorIva, precioTotal} })
    );
  }
  
  private logicaIva(subTotal: number, iva:number): number{
    const calcIva = (subTotal * iva) / 100;
    return Math.round(calcIva * 100) / 100;
  }
  
  SubTotal(): number{
    let subTotal:number = 0;  
    this.StoreStado.forEach((Producto) => {
      subTotal += Producto.Compra.Detalles.subTotal;
    });
    subTotal = Math.round(subTotal * 100) / 100;
    return subTotal;
  }

  Iva(): number{
    let ivaTotal:number = 0;  
    this.StoreStado.forEach((Producto) => {
      ivaTotal += Producto.Compra.Detalles.valorIva;
    });
    ivaTotal = Math.round(ivaTotal * 100) / 100;
    return ivaTotal;
  }

  Total(): number{
    let Total:number = 0;
    this.StoreStado.forEach((Producto) => {
      Total += Producto.Compra.Detalles.precioTotal;
    });
    Total = Math.round(Total * 100) / 100;
    return Total;
  }

  borrarCarrito(id: number){
    this.store.dispatch(eliminarObjeto({ id }));
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
    //this.compra.subTotal = this.newData.price;
    //this.calcularIva(this.compra.subTotal);
    //this.firstFormGroup.get('cantidad')?.setValue(1)
    //this.compra.precioTotal = Math.round((this.compra.subTotal + this.compra.valorIva) * 100) / 100;
  }

  changes({cantidad, subTotal, iva, valorIva ,precioTotal } : Detalles, {id, price, quantitys} : Product, value:string): void {
    console.log("Input",value);
    let newValue = parseInt(value);
    if(newValue <= 0 || newValue > quantitys ) {
      this.error = true;
    } else {
      this.error = false;
      
      cantidad = newValue;
      subTotal = cantidad * price;
      valorIva = this.logicaIva(subTotal, iva);
      precioTotal = Math.round((subTotal + valorIva) * 100) / 100;
      
      this.store.dispatch(
        cambioCantidadCarrito({ id, Detalles: {cantidad, subTotal, iva, valorIva, precioTotal} })
      );
    }
  }

  loadingImage(loading: boolean): void {  loading = false;    }

}
