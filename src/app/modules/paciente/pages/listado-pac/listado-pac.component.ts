import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Paciente } from '../../interface/paciente.interface';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listado-pac',
  templateUrl: './listado-pac.component.html',
  styleUrls: ['./listado-pac.component.css']
})
export class ListadoPacComponent implements OnInit {

  constructor(private _pacienteService: PacienteService, private _snackBar: MatSnackBar) { }

  listcliente: Paciente[] = [];

  displayedColumns: string[] = ['nombres','sexo', 'edad', 'raza','peso','acciones'];
  dataSource!: MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargarPaciente();
   }
   
   
   cargarPaciente() {
     this.listcliente = this._pacienteService.ConseguirPaciente();
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
   

  Eliminarpacientes(id: number) {
    this._pacienteService.Eliminarpacientes(id);
    this.cargarPaciente();

    this._snackBar.open('El cliente fue eliminado con exito', '',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',

    })

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
