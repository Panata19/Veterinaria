import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
  isMobile = false;
  searchValue: string = '';


  displayedColumns: string[] = ['numDocumento', 'nombreCliente', 'apellidosCliente', 'direccion', 'telefono', 'correo', 'sexo', 'fechaNac', 'nacionalidad', 'estado', 'acciones'];
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
    this.detectMobile();

  }

  detectMobile() {
    this.isMobile = window.innerWidth <= 767;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectMobile();
    this.ngAfterViewInit()
  }


  cargarcliente() {
    const clientesActivos = this._clienteService.getCliente().filter(cliente => cliente.estado);    
    const clientesInactivos = this._clienteService.getCliente().filter(cliente => !cliente.estado);  
    this.listcliente = [...clientesActivos, ...clientesInactivos];
    this.dataSource = new MatTableDataSource(this.listcliente)
    

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.isMobile) {
      this.applyMobileFilter(filterValue);
    }
  }

  applyMobileFilter(filterValue: string) {
    this.listcliente = this.dataSource.data.filter(
      (cliente) =>
        cliente.nombreCliente.toLowerCase().includes(filterValue) ||
        cliente.apellidosCliente.toLowerCase().includes(filterValue) ||
        cliente.numDocumento.toLowerCase().includes(filterValue)
    );
  }
  
  

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarEditarClientesComponent, {
      width: '700px', 
      height: 'auto',
      data: { modo: 'agregar' } 
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
  

 

  eliminarCliente(id: number | undefined) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: '¿Está seguro de que desea eliminar este cliente?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const cliente = this.listcliente.find(c => c.id === id);
        if (cliente) {
          cliente.estado = false;
          this.editarcliente(cliente);
          this._snackBar.open('El cliente fue marcado como inactivo con éxito', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      }
      this.cargarcliente();
      this.ngAfterViewInit();
    });
  }

}
