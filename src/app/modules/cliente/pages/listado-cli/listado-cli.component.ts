import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../interface/cliente.interface';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../service/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-listado-cli',
  templateUrl: './listado-cli.component.html',
  styleUrls: ['./listado-cli.component.css']
})
export class ListadoCliComponent implements OnInit {

  listcliente: Cliente[] = [];

  displayedColumns: string[] = ['nombres', 'apellidos', 'sexo', 'edad', 'nacionalidad', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
 


  constructor(private _clienteService: ClienteService, private _snackBar: MatSnackBar) { }

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarCliente(id: number) {
    this._clienteService.deleteCliente(id);
    this.cargarcliente();

    this._snackBar.open('El cliente fue eliminado con exito', '',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',

    })

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
