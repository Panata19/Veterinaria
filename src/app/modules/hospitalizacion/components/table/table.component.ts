import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Paciente } from '../../interfaces/paciente.interface';
import { HosipitalizacionService } from '../../services/hosipitalizacion.service';
import { DetalleHospitalizacionComponent } from '../modals/detalle-hospitalizacion/detalle-hospitalizacion.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataPacientes!: Paciente[];

  displayedColumns: string[] = ['nombreMascota', 'tipoMascota', 'raza', 'sexo', 'edad', 'fechaNac', 'opciones' ];
  dataSource!: MatTableDataSource<Paciente>;

  constructor(private hs: HosipitalizacionService,
              private matDialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer) { }
  
  ngOnInit(): void {
    this.hs.allPacientes.subscribe(paciente =>{
      this.dataPacientes = paciente;
      this.dataSource = new MatTableDataSource<Paciente>(this.dataPacientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  abrirDetalles(): MatDialogRef<DetalleHospitalizacionComponent>{
    return this.matDialog.open(DetalleHospitalizacionComponent, {
      width: '900px',
      height: '550px', 
    });
  }
}

