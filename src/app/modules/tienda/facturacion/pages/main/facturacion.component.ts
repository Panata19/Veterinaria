import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { agregarObjeto, eliminarObjeto } from '../../services/app.actions';
import { AppState, Objeto } from '../../services/app.state';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TiendaService } from '../../services/tienda.service';
import { StoreProduct } from '../../interfaces/ProductData';
import { Product } from '../../interfaces/CompraProducto';
import { ModalAddCarritoComponent } from '../../components/modal-addCarrito/modal-addCarrito.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalCarritoComponent } from '../../components/modal-carrito/modal-carrito.component';


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent  {

  //** Variables para filtrar **//
  searchTerm: string = '';
  filteredProducts: StoreProduct[] = [];

  //** Productos **//
  Products: StoreProduct[] = [];

  //** Variables para las Vistas  **//
  List: boolean = true;
  Grid: boolean = false;
  
  //**  Variables Paginación **//
  length: number = 50;
  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [4, 8, 24, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;
  
  objetos!: Objeto[];
  constructor(
    private TiendaService: TiendaService,
    public dialog: MatDialog, private _snackBar: MatSnackBar,
    private store: Store<{ app: AppState }>
  ){ 
    this.store.select(state => state.app.objetos).subscribe(objetos => {
      console.log(objetos);
      this.objetos = objetos;
    });
    
    this.Products = TiendaService.getProducts();
    this.length = this.Products.length;
    this.filterProducts()    
  }

  agregarCarrito(objeto: Objeto) {
    this.store.dispatch(agregarObjeto({ objeto }));
  }

  eliminarCarrito(id: number) {
    console.log('Eliminando')
    this.store.dispatch(eliminarObjeto({ id }));
  }

  //** Metodo para filtrar las cards **//
  filterProducts(): void {
    this.filteredProducts = this.Products.filter(product => {
      const productNameMatch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const categoryMatch = product.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      const statusMatch = product.stock.toLowerCase().includes(this.searchTerm.toLowerCase());
      return productNameMatch || categoryMatch || statusMatch;
    });
    this.length = this.filteredProducts.length;
    this.pageIndex = 0
  }

  //** Parte del Paginador **//
  handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  //** Establece las paginas **//
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  //** Cambiar a Vista Grid **//
  viewGrid(): void{
    if(this.Grid === false){
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
  }
  //** Cambiar a Vista Lista **//
  viewList(): void {
    if(this.List === false){
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
  }

  //** Modal Comprar **//
  addCarrito(Producto: Product): void{
    const dialogRef = this.dialog.open(ModalAddCarritoComponent, {
      width: '700px', 
      height: 'auto',
      panelClass: 'width-dialog',
      data: {
        id: Producto.id,
        name: Producto.name, 
        image: {
          url: Producto.image.url,
          loading: true
        },
        price: Producto.price,
        category: Producto.category,
        quantitys: Producto.quantitys,
        stock: Producto.stock,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result !== undefined){
        if(result.agregarCarrito){
          this.agregarCarrito(result.Compra);
        } else {
          this.eliminarCarrito(result.Compra.Producto.id);
        }
        
        this.Products = this.TiendaService.getProducts();
        this.length = this.Products.length;
        this.filterProducts()
        this.snackbar('¡Se añadio al carrito con Exito!','success');
      } else {
        this.snackbar('¡No añadio al carrito!','danger');  
      }
      
    });
  }

  abrirCarrito(){
    const dialogRef = this.dialog.open(ModalCarritoComponent, {
      width: '700px', 
      height: 'auto',
      panelClass: 'width-dialog',
      data: {
        id: this.objetos[0].Producto.id,
        name: this.objetos[0].Producto.name, 
        image: {
          url: this.objetos[0].Producto.image.url,
          loading: true
        },
        price: this.objetos[0].Producto.price,
        category: this.objetos[0].Producto.category,
        quantitys: this.objetos[0].Producto.quantitys,
        stock: this.objetos[0].Producto.stock,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.Products = this.TiendaService.getProducts();
        this.length = this.Products.length;
        this.filterProducts()
        this.snackbar('¡Compra realizada con Exito!','success');
      } else {
        this.snackbar('¡Compra Cancelada!','danger');  
      }
      
    });
  }

  private snackbar(label: string, style: string): void{
    this._snackBar.open(label, 'Cerrar', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: `snackbar-custom-${style}`
    });
  }

}
