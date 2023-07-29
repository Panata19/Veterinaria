import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/modules/hospitalizacion/interfaces/paciente.interface';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent {

  @Input() dataPacientes!: MatTableDataSource<Paciente>  
  
  filtrarDatos(event: KeyboardEvent, dataSource: MatTableDataSource<Paciente>){
    const filtro: string = (event.target as HTMLInputElement).value;
    dataSource.filter = filtro.toLowerCase().trim();
  }
}
