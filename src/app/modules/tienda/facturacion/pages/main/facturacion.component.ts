import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  agregarObjeto,
  cambioCarrito,
  eliminarObjeto,
} from '../../services/app.actions';
import { AppState, Objeto } from '../../services/app.state';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TiendaService } from '../../services/tienda.service';
import { StoreProduct, Product } from '../../interfaces/CompraProducto';
import { ModalAddCarritoComponent } from '../../components/modal-addCarrito/modal-addCarrito.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalCarritoComponent } from '../../components/modal-carrito/modal-carrito.component';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
})
export class FacturacionComponent {
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

  StoreStado!: Objeto[];
  LiveCarrito: boolean = false;

  constructor(
    private TiendaService: TiendaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private store: Store<{ app: AppState }>
  ) {
    this.store
      .select((state) => state.app.objetos)
      .subscribe((objetos) => {
        console.log(objetos);
        this.StoreStado = objetos;
      });

    this.Products = TiendaService.getProducts();
    this.length = this.Products.length;
    this.filterProducts();
  }

  checkStado(id: number): boolean {
    const objetoEncontrado = this.StoreStado.find(
      (obj) => obj.Compra.Producto.id === id
    );
    return objetoEncontrado ? objetoEncontrado.enCarrito : false;
  }

  agregarCarrito(objeto: Objeto) {
    this.store.dispatch(agregarObjeto({ objeto }));
    this.store.dispatch(
      cambioCarrito({ id: objeto.Compra.Producto.id, status: true })
    );
  }

  eliminarCarrito(id: number) {
    console.log('Eliminando');
    this.store.dispatch(eliminarObjeto({ id }));
  }

  //** Metodo para filtrar las cards **//
  filterProducts(): void {
    this.filteredProducts = this.Products.filter((product) => {
      const productNameMatch = product.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const categoryMatch = product.category
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const statusMatch = product.stock
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      return productNameMatch || categoryMatch || statusMatch;
    });
    this.length = this.filteredProducts.length;
    this.pageIndex = 0;
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
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  //** Cambiar a Vista Grid **//
  viewGrid(): void {
    if (this.Grid === false) {
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
  }
  //** Cambiar a Vista Lista **//
  viewList(): void {
    if (this.List === false) {
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
  }

  //** Modal Comprar **//
  addCarrito(Producto: Product): void {
    const dialogRef = this.dialog.open(ModalAddCarritoComponent, {
      width: '700px',
      height: 'auto',
      panelClass: 'width-dialog',
      data: {
        id: Producto.id,
        name: Producto.name,
        image: {
          url: Producto.image.url,
          loading: true,
        },
        price: Producto.price,
        category: Producto.category,
        quantitys: Producto.quantitys,
        stock: Producto.stock,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== undefined) {
        switch (result.tipo) {
          case 'Agregando':
            this.agregarCarrito(result.element);
            this.snackbar('¡Se añadio al carrito con Exito!', 'success');
            break;
          case 'Actualizando':
            this.snackbar('¡Se Actualizo el carrito con Exito!', 'success');
            break;
          case 'Eliminando':
            this.eliminarCarrito(result.element.Compra.Producto.id);
            this.snackbar('¡Se Elimino del carrito con Exito!', 'danger');
            break;
          default:
            break;
        }

        this.Products = this.TiendaService.getProducts();
        this.length = this.Products.length;
        this.filterProducts();
      } else {
        this.snackbar('¡No realizo cambios!', 'danger');
      }
    });
  }

  abrirCarrito() {
    const dialogRef = this.dialog.open(ModalCarritoComponent, {
      width: '700px',
      height: 'auto',
      panelClass: 'width-dialog',
      data: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.Products = this.TiendaService.getProducts();
        this.length = this.Products.length;
        this.filterProducts();
        this.snackbar('¡Compra realizada con Exito!', 'success');
      } else {
        this.snackbar('¡Compra Cancelada!', 'danger');
      }
    });
  }

  private snackbar(label: string, style: string): void {
    this._snackBar.open(label, 'Cerrar', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: `snackbar-custom-${style}`,
    });
  }
}
