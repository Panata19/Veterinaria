import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hospitalizacion } from '../../../interfaces/hospitalizacion.interface';

@Component({
  selector: 'app-detalle-hospitalizacion',
  templateUrl: './detalle-hospitalizacion.component.html',
  styleUrls: ['./detalle-hospitalizacion.component.css']
})
export class DetalleHospitalizacionComponent implements OnInit {

  hospitalizacion!: Hospitalizacion;
  
  constructor(@Inject(MAT_DIALOG_DATA) 
              public data: Hospitalizacion, 
              public dialogRefDetallerHosp: MatDialogRef<DetalleHospitalizacionComponent>
             ) { }

  ngOnInit(): void {
    this.hospitalizacion = this.data;
  }

}
