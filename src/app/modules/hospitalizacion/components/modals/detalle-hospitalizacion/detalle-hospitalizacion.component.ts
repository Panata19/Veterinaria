import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hospitalizacion } from '../../../interfaces/hospitalizacion.interface';
import { Paciente } from '../../../interfaces/paciente.interface';
import { Cliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-detalle-hospitalizacion',
  templateUrl: './detalle-hospitalizacion.component.html',
  styleUrls: ['./detalle-hospitalizacion.component.css']
})
export class DetalleHospitalizacionComponent implements OnInit {

  hospitalizacion!: Hospitalizacion;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Hospitalizacion) { }

  ngOnInit(): void {
    this.hospitalizacion = this.data;
  }

}
