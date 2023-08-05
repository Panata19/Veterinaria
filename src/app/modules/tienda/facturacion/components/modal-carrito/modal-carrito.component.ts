
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Product, Detalles, StoreElement, MetodoPago } from '../../interfaces/CompraProducto';

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

  MetodosPago!: MetodoPago[];
  //** Variables para Forms  **//
  private costoTotal: number = 1;
  /*
  DetallesFactura = {
    cantidad: this.StoreStado[0].Compra.Detalles.cantidad,
    subTotal: this.StoreStado[0].Compra.Producto.price,
    valorIva: 0,
    iva: this.iva,
    precioTotal: 0,
  }*/

  formStep2 = this._formBuilder.group({
    numDoc: [ '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    nombre: [ '', [Validators.required, Validators.maxLength(30)]],
    apellido: [ '', [Validators.required, Validators.maxLength(30)]],
    telefono: [ '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    direccion: [ '', [Validators.required, Validators.maxLength(30)]],  
    correo: [ '', Validators.email],
  });

  thirdFormGroup = this._formBuilder.group({
    numDoc: [ '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  });


  formStep3 = this._formBuilder.group({
    MetodosPago: ['',[ Validators.required],],
    Efectivo: [ 0, [ Validators.required, Validators.min(0), Validators.max(5)] ],
    Debito: [ 0, [ Validators.required, Validators.min(0), Validators.max(5)] ],
    Credito: [ 0, [ Validators.required, Validators.min(0), Validators.max(5)] ],
    Cheque: [ 0, [ Validators.required, Validators.min(0), Validators.max(5)] ],
  });

  stepperOrientation: Observable<StepperOrientation>;
  /*
  CompraData: any = {
    Producto: this.StoreStado[0].Compra.Producto,
    Cantidad: this.compra,
    user: this.formStep2.value
  }*/
  public StoreStado!: Objeto[];
  formStep1: FormGroup = this._formBuilder.group({});

  tooltipcuenta = {
    label: {
     wait: 'Esperando Cambios en la Cuenta',
     check: 'Pago Completo',
     down: 'Excediste el Costo total',
     up: 'Aun no completas el Costo total'
    },
    icon: {
      wait: 'bi-dash-circle-fill',
      check: 'bi-check-circle-fill',
      down: 'bi-arrow-down-circle-fill',
      up: 'bi-arrow-up-circle-fill'
    }
  }

  toolTipState = {
    label: this.tooltipcuenta.label['wait'],
    icon: this.tooltipcuenta.icon['wait']
  }
  iconColorState:string = 'text-primary-emphasis'
  cuantaPagos: number = 0;
  cuentaReady: boolean = true;

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
    switch (event.selectedIndex) {
      case 1: //** Paso 2 **//
        //** Llamar Clientes **//
        this.Clients = this.TiendaService.getCliente();  
        break;

      case 2: //** Paso 3 **//
        this.MetodosPago = this.TiendaService.getMetodPagos();
        break;

      default:
        break;
    }

    if(!this.formStep2.valid || !this.thirdFormGroup.valid){
      this.labelToolTip = 'Completa los pasos primero';
    } else {
      this.labelToolTip = 'Listo para comprar';
    }
    
    // Establecer nuevos valores en el formulario
    this.thirdFormGroup.patchValue({
      numDoc: this.formStep2.get('numDoc')?.value,
      nombre: this.formStep2.get('nombre')?.value+' '+this.formStep2.get('apellido')?.value,
      telefono: this.formStep2.get('telefono')?.value,
    });
  }
  // Establecer nuevos valores del Cliente Seleccionado
  selecction(selection: Cliente): void{  
    this.formStep2.setValue({
      numDoc: selection.numDocumento ,
      nombre: selection.nombreCliente,
      apellido: selection.apellidosCliente,
      telefono: selection.telefono,
      direccion: selection.direccion,
      correo: selection.correo,
    });
    // Obtener todos los Datos  del Cliente
    this.compraCliente = this.formStep2.value;
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
    this.StoreStado?.forEach((Producto) => {
      ivaTotal += Producto.Compra.Detalles.valorIva;
    });
    ivaTotal = Math.round(ivaTotal * 100) / 100;
    return ivaTotal;
  }

  Total(): number{
    let Total:number = 0;
    this.StoreStado?.forEach((Producto) => {
      Total += Producto.Compra.Detalles.precioTotal;
    });
    Total = Math.round(Total * 100) / 100;
    this.costoTotal = Total;
    return Total;
  }

  borrarCarrito(id: number){
    this.store.dispatch(eliminarObjeto({ id }));
  }

  vista(){
    let metodos = this.formStep3.get('MetodosPago')?.value;
    this.changeMaxValue(this.Total(), metodos);
    
    this.logicaCuenta(metodos);

  }

  logicaCuenta(metodos: string[]): void{
    this.cuantaPagos = 0;
    metodos.forEach((metodo: string='') => {
      const Nmetodo = this.obtenerMetodoPago(metodo);
      switch (Nmetodo) {
        case 'Efectivo':
          const efect = parseFloat(this.formStep3.get('Efectivo')?.value);
          this.cuantaPagos += efect;
          break;
        case "Debito":
          const debit = parseFloat(this.formStep3.get('Debito')?.value);  
          this.cuantaPagos += debit;
          
          break;
        case "Credito":
          const credit = parseFloat(this.formStep3.get('Credito')?.value);  
          this.cuantaPagos += credit;
          
          break;
        case "Cheque":
          const cheque = parseFloat(this.formStep3.get('Cheque')?.value);  
          this.cuantaPagos += cheque;
          
          break;

        default:
          break;
      }
    });
    console.log("Total",this.cuantaPagos)
  }

  checkPagos(): void{
    console.log('Calculando')
    let state: string = 'wait';
    
    switch (true) {
      case this.cuantaPagos === 0:
        //TODO: Hacer la funcionalidad
        state = 'wait';
        this.iconColorState = 'text-primary-emphasis'
        break;
      case this.cuantaPagos === this.Total():
        //TODO: Hacer la funcionalidad 
        this.cuentaReady = false;
        state = 'check';   
        this.labelToolTip = 'Listo para Comprar'
        this.iconColorState = 'text-success'
        break;
      case this.cuantaPagos >= this.Total():
        //TODO: Hacer la funcionalidad
        this.cuentaReady = true;
        state = 'down';
        this.iconColorState = 'text-danger'
        break;
      case this.cuantaPagos <= this.Total():
        //TODO: Hacer la funcionalidad
        state = 'up';
        this.cuentaReady = true;
        this.iconColorState = 'text-warning'
        break;
      default:
        break;
    }
    const iLabel = Object.keys(this.tooltipcuenta.label).indexOf(state);
    const iIcon = Object.keys(this.tooltipcuenta.icon).indexOf(state);
    this.toolTipState.icon = Object.values(this.tooltipcuenta.icon)[iIcon];
    this.toolTipState.label = Object.values(this.tooltipcuenta.label)[iLabel];

  }

  changeMaxValue(maxValue: number, Tipo: string[]) {
    Tipo.forEach((item) => {
      const pago = this.obtenerMetodoPago(item);
      const cantidadControl = this.formStep3.get(pago);
      if (cantidadControl?.validator) {
        const newValidators = [Validators.required, Validators.min(1), Validators.max(maxValue)];
        cantidadControl.setValidators(newValidators);
        cantidadControl.updateValueAndValidity();
      }
    });
  }
  
  obtenerMetodoPago(pago: string): string {
    switch (pago) {
      case "Efectivo":
        return "Efectivo";
      case "Tarjeta Debito":
        return "Debito";
      case "Tarjeta Credito":
        return "Credito";
      case "Cheque":
        return "Cheque";
      default:
        return "Método de pago inválido";
    }
  }

  private advertencia(){
      this.warning = true;
      setTimeout(()=> {
        this.warning = false
        this.label = '';
      }, 3200);
  }

  pagoCantidades(event: any){
    console.log(event);
    let metodos = this.formStep3.get('MetodosPago')?.value;
    this.logicaCuenta(metodos);
    this.checkPagos();
  }

  message(): string {
    return this.label;
  }

  comprar(){
    //Productos del Carrito
    let Factura = {}
    let FacturaDetalles: any[] = [];
    this.StoreStado.forEach((Producto) => {
      const FacturaDetalle = {
        idFacturaDetalle: '001-001-000000000010345',
        idFacturaCabecera: '1',
        idProducto: Producto.Compra.Producto.id,
        nombreProducto: Producto.Compra.Producto.name,
        precioProducto: Producto.Compra.Producto.price,
        cantidadProducto: Producto.Compra.Detalles.cantidad,
        subtotalProducto: Producto.Compra.Detalles.subTotal,
        totalProducto: Producto.Compra.Detalles.precioTotal
      };
      FacturaDetalles.push(FacturaDetalle);
    });
    
    Factura = {
      Detalles: FacturaDetalles
    }
    //Datos del Usuario
    const Client = {
      numDoc: this.formStep2.get('numDoc')?.value,
      nombre: this.formStep2.get('nombre')?.value,
      apellido: this.formStep2.get('apellido')?.value,
      telefono: this.formStep2.get('telefono')?.value,
      direccion: this.formStep2.get('direccion')?.value,
      correo: this.formStep2.get('correo')?.value,
    }
    
    //Datos de Pago
    
    const DatosPago = {
      MetodosPago: this.formStep3.get('MetodosPago')?.value,
      Efectivo: this.formStep3.get('Efectivo')?.value,
      Debito: this.formStep3.get('Debito')?.value,
      Credito: this.formStep3.get('Credito')?.value,
      Cheque: this.formStep3.get('Cheque')?.value
    };

    

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
    const anio = fechaActual.getFullYear();

    const FacturaCabecera = {
      idFacturaCabecera: 1,
      idEmpresa: 1,
      idUsuario: 2,
      numeroFactura: "001-001-000000000010345",
      fechaFacturaCreacion: `${anio}-${mes}-${dia}`,
      idCliente: Client.numDoc,
      nombreCliente: Client.nombre +' '+Client.apellido,
      numDocumentoCliente: Client.numDoc,
      subtotalFactura: this.SubTotal(),
      iva: this.Iva(),
      totalFactura: this.Total(),
      "estadoFacturaCabecera": "AP",
      "observaciones": null
    }

    Factura = {
      ...Factura,
      Cabecera: FacturaCabecera
    }
    console.log(Factura);

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
