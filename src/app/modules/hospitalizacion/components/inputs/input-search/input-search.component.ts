import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mascotas } from 'src/app/modules/hospitalizacion/interfaces/paciente.interface';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent {

  @Input() dataSource!: MatTableDataSource<Mascotas>  
  
  filtrarDatos(event: KeyboardEvent, dataSource: MatTableDataSource<Mascotas>){
    const filtro: string = (event.target as HTMLInputElement).value;
    dataSource.filter = filtro.toLowerCase().trim();
  }
}
