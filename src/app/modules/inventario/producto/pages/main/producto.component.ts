import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-delete-modal.component';

import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from '../../components/edit-product-modal/edit-product-modal.component';

import { ImageInfo, ProductoTable } from '../../interfaces/ProductData';
import { ProductsService } from '../../services/products.service';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements AfterViewInit  {
  
  displayedColumns: string[] = ['select','id', 'name', 'image', 'price', 'category', 'quantitys', 'stock','buttons'];
  dataSource: MatTableDataSource<ProductoTable>;
  selection: SelectionModel<ProductoTable>;
  users!:ProductoTable[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private ProductsService: ProductsService, public dialog: MatDialog, private _snackBar: MatSnackBar) {

    //** Get Data **/
    this.users = this.ProductsService.getProducts();

    //** Assign the data to the data source for the table to render  **/
    this.dataSource = new MatTableDataSource(this.users);
    this.selection = new SelectionModel<ProductoTable>(true, []);
  }
  
  //** Logica Añadir Nuevo Producto **//
  addProduct(){
    let id: number, price: number, quantitys: number;
    let name: string, category: string, stock:string;
    let image: ImageInfo = {
      url: '',
      loading: true
    }
    let buttons: boolean = false;

    const dialogRef = this.dialog.open(AddProductModalComponent, {
      data: {
        id: id!,
        name: name!,
        image: image,
        price: price!,
        category: category!,
        quantitys: quantitys!,
        stock: stock!,
        buttons: buttons
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result !== undefined ){
        this.ProductsService.addProduct(result);
        
        this.snackbar('¡Producto Agregado con Exito!','success');
      } else {
        this.snackbar('¡Producto NO Agregado!','danger');
      }
      this.ngAfterViewInit();
    });
    
  } /** End AddProduct **/

  //** Logica Editar Nuevo Producto **//
  EditProduct(row: ProductoTable){
    let id: number = row.id, price: number = row.price, quantitys: number = row.quantitys;
    let name: string = row.name, category: string = row.category, stock:string = row.stock;
    let image: ImageInfo = {
      url: row.image.url,
      loading: true
    }
    let buttons: boolean = row.buttons;

    const dialogRef = this.dialog.open(EditProductModalComponent, {
      data: {
        id: id,
        name: name,
        image: image,
        price: price,
        category: category,
        quantitys: quantitys,
        stock: stock,
        buttons: buttons
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result !== undefined ){
        this.ProductsService.EditProduct(result);
        this.snackbar('¡Producto Editado con Exito!','success');
      } else {
        this.snackbar('¡Producto NO Editado!','danger');
      }
      this.ngAfterViewInit();
    });
    
  } /** End EditProduct **/


  //** Validación para permitir usar eliminar en Masa **//
  removeButton(){ return  this.selection.selected.length === 0; }
  
  //** Validación para eliminar en Masa **/
  removeProduct(product?:ProductoTable){
    //** Logica Del Modal de confirmación **/
    let confirmation: boolean = false;
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        label: '¿Estas seguro de querer eliminar este Producto?', 
        confirmation: confirmation 
      },
    });

    //** Una vez se cierra el modal **//
    dialogRef.afterClosed().subscribe(result => {
      confirmation = result;
      //** Logica Para Eliminar **/
      if(confirmation){
        let selecteds:ProductoTable[] = this.selection.selected;    
        if(product===undefined){
          selecteds.forEach( (index) => {
            this.selection.deselect(index);
            let newData = this.ProductsService.deleteProduct(index);
            this.dataSource = new MatTableDataSource(newData);
          });
        }else{
          let newData = this.ProductsService.deleteProduct(product!);
          this.dataSource = new MatTableDataSource(newData);
        }
        this.snackbar('¡Eliminado con Exito!','success');
      }else{
        //** Abre Snackbar **//
        this.snackbar('¡Operación Cancelada!','danger');
      }
      
      this.ngAfterViewInit();
    });
    
    
  }
  //** Crea SnackBar con estilos **//
  private snackbar(label: string, style: string): void{
    this._snackBar.open(label, 'Cerrar', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: `snackbar-custom-${style}`
    });
  }
  //** Valida Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  //** Selecciona todas las filas si no están todas seleccionadas; en caso contrario, borra la selección. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  //** La etiqueta de la casilla de verificación de la fila pasada */
  checkboxLabel(row?: ProductoTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
 //** Actualiza la vista de la tabla con los cambios actuales de la DB **/
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}