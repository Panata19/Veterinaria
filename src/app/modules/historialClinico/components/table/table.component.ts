import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { HistorialClinicoService } from '../../services/historial-clinico.service';
import { Paciente } from '../../interfaces/paciente.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataPacientes!: Paciente[];

  displayedColumns: string[] = ['nombreMascota', 'tipoMascota', 'raza', 'sexo', 'edad', 'fechaNac', 'opciones' ];
  dataSource!: MatTableDataSource<Paciente>;

  constructor(private hcs: HistorialClinicoService,
              private _liveAnnouncer: LiveAnnouncer,
              private router: Router) { }
  
  ngOnInit(): void {
    this.hcs.allPacientes.subscribe(paciente =>{
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

  irPaginaHistorialClinicaPaciente(){
    this.router.navigate(['historialClinico/historalClinicoPaciente']);
  }

}
