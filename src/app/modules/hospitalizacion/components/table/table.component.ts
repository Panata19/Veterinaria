import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Mascotas } from '../../interfaces/paciente.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSort, Sort } from '@angular/material/sort';
import { HosipitalizacionService } from '../../services/hosipitalizacion.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'nombrePaciente', 'tipo', 'raza', 'sexo', 'edad'];
  dataSource = new MatTableDataSource<Mascotas>(this.hospitalizacionServices.hospitalizacion);

  constructor(private hospitalizacionServices: HosipitalizacionService,
              private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

