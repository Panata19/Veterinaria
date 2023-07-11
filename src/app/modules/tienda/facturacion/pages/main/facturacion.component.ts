import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TiendaService } from '../../services/tienda.service';
import { ProductoData } from '../../interfaces/ProductData';
import { CompraData } from '../../interfaces/CompraProducto';
import { ModalCompraComponent } from '../../components/modal-compra/modal-compra.component';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  
  searchTerm: string = '';

  fontStyleControl = new FormControl('grid_view');
  List: boolean = true;
  Grid: boolean = false;

  Products: ProductoData[] = [];

  length: number = 50;
  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [4, 8, 24, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private TiendaService: TiendaService, public dialog: MatDialog) { 
    this.Products = TiendaService.getProducts();
    this.length = this.Products.length;
  }

  ngOnInit(): void {
  }

  filterProducts(): any[] {
    return this.Products.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }  

  //** Parte del Paginador **//
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

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
    console.log('Grid', this.Grid)
    console.log('List', this.List)
    console.log('----')
  }
  //** Cambiar a Vista Lista **//
  viewList(): void {
    if(this.List === false){
      this.Grid = !this.Grid;
      this.List = !this.List;
    }
    console.log('List', this.List)
    console.log('Grid', this.Grid)
    console.log('----')
  }

  //** Modal Comprar **//
  procesoCompra(Producto: CompraData): void{
    const dialogRef = this.dialog.open(ModalCompraComponent, {
      data: {
        id: Producto.id,
        name: Producto.name, 
        image: Producto.image,
        price: Producto.price,
        category: Producto.category,
        quantitys: Producto.quantitys,
        status: Producto.status,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
