import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-delete-modal.component';

import { AddBodegaModalComponent } from '../../components/add-bodega-modal/add-bodega-modal.component';
import { EditBodegaModalComponent } from '../../components/edit-bodega-modal/edit-bodega-modal.component';

import { BodegaTable, ImageInfo } from '../../interfaces/BodegaData';
import { BodegaService } from '../../services/bodega.service';



@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements AfterViewInit{

  displayedColumns: string[] = ['select','id', 'name', 'image', 'price', 'category', 'quantitys', 'status','buttons'];
  dataSource: MatTableDataSource<BodegaTable>;
  selection: SelectionModel<BodegaTable>;
  users!:BodegaTable[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private BodegaService: BodegaService, public dialog: MatDialog, private _snackBar: MatSnackBar) {

    //** Get Data **/
    this.users = this.BodegaService.getBodegas();

    //** Assign the data to the data source for the table to render  **/
    this.dataSource = new MatTableDataSource(this.users);
    this.selection = new SelectionModel<BodegaTable>(true, []);
  }
  
  //** Logica Añadir Nuevo Bodegao **//
  addBodega(){
    let id: number, price: number, quantitys: number;
    let name: string, category: string, status:string;
    let image: ImageInfo = {
      url: '',
      loading: true
    }
    let buttons: boolean = false;
    
    const dialogRef = this.dialog.open(AddBodegaModalComponent, {
      data: {
        id: id!,
        name: name!,
        image: image,
        price: price!,
        category: category!,
        quantitys: quantitys!,
        status: status!,
        buttons: buttons
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result !== undefined ){
        this.BodegaService.addBodega(result);
        
        this.snackbar('¡Bodega Agregada con Exito!','success');
      } else {
        this.snackbar('¡Bodega NO Agregada!','danger');
      }
      this.ngAfterViewInit();
    });
    
  } /** End AddBodega **/

  //** Logica Editar Nuevo Bodegao **//
  EditBodega(row: BodegaTable){
    let id: number = row.id, price: number = row.price, quantitys: number = row.quantitys;
    let name: string = row.name, category: string = row.category, status:string = row.status;
    let image: ImageInfo = {
      url: row.image.url,
      loading: true
    }
    let buttons: boolean = row.buttons;

    const dialogRef = this.dialog.open(EditBodegaModalComponent, {
      data: {
        id: id,
        name: name,
        image: image,
        price: price,
        category: category,
        quantitys: quantitys,
        status: status,
        buttons: buttons
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result !== undefined ){
        this.BodegaService.EditBodega(result);
        this.snackbar('¡Bodega Editada con Exito!','success');
      } else {
        this.snackbar('¡Bodega NO Editada!','danger');
      }
      this.ngAfterViewInit();
    });
    
  } /** End EditBodega **/


  //** Validación para permitir usar eliminar en Masa **//
  removeButton(){ return  this.selection.selected.length === 0; }
  
  //** Validación para eliminar en Masa **/
  removeBodega(product?:BodegaTable){
    //** Logica Del Modal de confirmación **/
    let confirmation: boolean = false;
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        label: '¿Estas seguro de querer eliminar este Bodegao?', 
        confirmation: confirmation 
      },
    });

    //** Una vez se cierra el modal **//
    dialogRef.afterClosed().subscribe(result => {
      confirmation = result;
      //** Logica Para Eliminar **/
      if(confirmation){
        let selecteds:BodegaTable[] = this.selection.selected;    
        if(product===undefined){
          selecteds.forEach( (index) => {
            this.selection.deselect(index);
            let newData = this.BodegaService.deleteBodega(index);
            this.dataSource = new MatTableDataSource(newData);
          });
        }else{
          let newData = this.BodegaService.deleteBodega(product!);
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
  snackbar(label: string, style: string){
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
  checkboxLabel(row?: BodegaTable): string {
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
