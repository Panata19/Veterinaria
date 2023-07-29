import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Paciente } from '../../interface/paciente.interface';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPacientesComponent } from '../agregar-editar-pacientes/agregar-editar-pacientes.component';
import { ConfirmacionComponent } from '../Verificacion/confirmacion/confirmacion.component';

@Component({
  selector: 'app-listado-pac',
  templateUrl: './listado-pac.component.html',
  styleUrls: ['./listado-pac.component.css']
})
export class ListadoPacComponent implements OnInit {

  constructor(private _pacienteService: PacienteService, private _snackBar: MatSnackBar,  private dialog: MatDialog) { }

  listpaciente: Paciente[] = [];

  displayedColumns: string[] = ['nombres','sexo', 'Fechadenacimiento', 'raza','peso','acciones'];
  dataSource!: MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargarPaciente();
   }
   
   
   cargarPaciente() {
     this.listpaciente = this._pacienteService.ConseguirPaciente();
     this.dataSource = new MatTableDataSource(this.listpaciente)
   }
 
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
 
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
   
  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarEditarPacientesComponent, {
      width: '1000px', 
      height: 'auto',
      data: { modo: 'agregar' } // Enviamos un objeto con el modo 'agregar' al modal
    });
  
    dialogRef.afterClosed().subscribe((result: Paciente) => {
      if (result) {
        this.agregarPaciente(result);
        this.cargarPaciente()
        this.ngAfterViewInit()
      }
    });
  }
  
  abrirModalEditar(paciente: Paciente): void {
    const dialogRef = this.dialog.open(AgregarEditarPacientesComponent, {
      width: '1000px', 
      height: 'auto',
      data: { modo: 'editar', paciente } // Enviamos un objeto con el modo 'editar' y el paciente al modal
    });
  
    dialogRef.afterClosed().subscribe((result: Paciente) => {
      if (result) {
        this.editarPaciente(result);
        this.cargarPaciente()
        this.ngAfterViewInit()
      }
    });
  }
  
  agregarPaciente(paciente: Paciente): void {
    this._pacienteService.Agregarpacientes(paciente);
    this.cargarPaciente();
  
    this._snackBar.open('El paciente fue agregado con éxito', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
  
 editarPaciente(paciente: Paciente): void {
    this._pacienteService.Editarpacientes(paciente);
    this.cargarPaciente();
  
    this._snackBar.open('El paciente fue editado con éxito', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }


  Eliminarpacientes(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: '¿Está seguro de que desea eliminar este paciente?',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._pacienteService.Eliminarpacientes(id);
        this.cargarPaciente();
        this.ngAfterViewInit()
  
        this._snackBar.open('El cliente fue eliminado con éxito', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }


}
