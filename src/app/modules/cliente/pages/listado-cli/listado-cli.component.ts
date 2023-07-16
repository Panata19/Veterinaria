import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../interface/cliente.interface';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from '../../service/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarClientesComponent } from '../agregar-editar-clientes/agregar-editar-clientes.component';

import { ConfirmacionComponent } from '../verificacion/confirmacion/confirmacion.component';
import { MatSort} from '@angular/material/sort';




@Component({
  selector: 'app-listado-cli',
  templateUrl: './listado-cli.component.html',
  styleUrls: ['./listado-cli.component.css']
})
export class ListadoCliComponent implements OnInit {

  listcliente: Cliente[] = [];

  displayedColumns: string[] = ['numDocumento', 'nombreCliente', 'apellidosCliente', 'direccion', 'telefono', 'correo', 'sexo', 'fechaNac', 'nacionalidad', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




 
  operacion: string = 'Agregar';



  constructor(private _clienteService: ClienteService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
) { }

  ngOnInit(): void {
    this.cargarcliente();  

  }


  cargarcliente() {
    this.listcliente = this._clienteService.getCliente();
    this.dataSource = new MatTableDataSource(this.listcliente)
    

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarEditarClientesComponent, {
      width: '700px', 
      height: 'auto',
      data: { modo: 'agregar' } // Enviamos un objeto con el modo 'agregar' al modal
    });
  
    dialogRef.afterClosed().subscribe((result: Cliente) => {
      if (result) {
        this.agregarCliente(result);
        this.cargarcliente()
        this.ngAfterViewInit()
      } else {
        this._snackBar.open('El cliente no fue guardado', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }



    });
  }


  abrirModalEditar(cliente: Cliente): void {
    const dialogRef = this.dialog.open(AgregarEditarClientesComponent, {
      width: '700px', 
      height: 'auto',
      data: { modo: 'editar', cliente } 
    });
  
    dialogRef.afterClosed().subscribe((result: Cliente) => {
      if (result) {
        this.editarcliente(result);
        this.cargarcliente()
        this.ngAfterViewInit()
      }else {
        this._snackBar.open('No se realizaron cambios', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }



  agregarCliente(cliente: Cliente): void {
    this._clienteService.addCliente(cliente);
    this.cargarcliente();  
    this._snackBar.open('El cliente fue agregado con éxito', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  editarcliente(cliente: Cliente): void {
    this._clienteService.editCliente(cliente);
    this.cargarcliente(); 
  
    this._snackBar.open('El cliente fue editado con éxito', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });

    
  }
  



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarCliente(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: '¿Está seguro de que desea eliminar este cliente?',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._clienteService.deleteCliente(id);
        this.cargarcliente();
        this.ngAfterViewInit()
  
        this._snackBar.open('El cliente fue eliminado con éxito', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
  
       
      }
    });
  }

}
