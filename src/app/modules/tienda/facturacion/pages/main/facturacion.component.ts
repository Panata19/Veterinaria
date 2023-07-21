import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TiendaService } from '../../services/tienda.service';
import { ProductoData } from '../../interfaces/ProductData';
import { CompraData } from '../../interfaces/CompraProducto';
import { ModalCompraComponent } from '../../components/modal-compra/modal-compra.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent  {

  //** Variables para filtrar **//
  searchTerm: string = '';
  filteredProducts: ProductoData[] = [];

  //** Productos **//
  Products: ProductoData[] = [];

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

  constructor(private TiendaService: TiendaService, public dialog: MatDialog, private _snackBar: MatSnackBar) { 
    this.Products = TiendaService.getProducts();
    this.length = this.Products.length;
    this.filterProducts()
  }

  //** Metodo para filtrar las cards **//
  filterProducts(): void {
    this.filteredProducts = this.Products.filter(product => {
      const productNameMatch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const categoryMatch = product.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      const statusMatch = product.status.toLowerCase().includes(this.searchTerm.toLowerCase());
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
  procesoCompra(Producto: CompraData): void{
    const dialogRef = this.dialog.open(ModalCompraComponent, {
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
        status: Producto.status,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result === null||undefined){
        this.Products = this.TiendaService.getProducts();
        this.length = this.Products.length;
        this.filterProducts()
        this.snackbar('¡Compra realizada con Exito!','success');
      }
      this.snackbar('¡Compra Cancelada!','danger');
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
