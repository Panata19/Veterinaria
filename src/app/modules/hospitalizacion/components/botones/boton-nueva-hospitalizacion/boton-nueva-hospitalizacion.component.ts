import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistroHospitalizacionComponent } from '../../modals/registro-hospitalizacion/registro-hospitalizacion.component';

@Component({
  selector: 'app-boton-nueva-hospitalizacion',
  templateUrl: './boton-nueva-hospitalizacion.component.html',
  styleUrls: ['./boton-nueva-hospitalizacion.component.css']
})
export class BotonNuevaHospitalizacionComponent {

  constructor(private matDialog: MatDialog ) { }

  openDialog(): MatDialogRef<RegistroHospitalizacionComponent>{
    return this.matDialog.open(RegistroHospitalizacionComponent, {
    width: '1400px',
    height: '600px',
    data: ''
  });
}

}
