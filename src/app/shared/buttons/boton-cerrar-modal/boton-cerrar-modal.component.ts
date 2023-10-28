import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-boton-cerrar-modal',
  templateUrl: './boton-cerrar-modal.component.html',
  styleUrls: ['./boton-cerrar-modal.component.css']
})
export class BotonCerrarModalComponent {

  @Input() dialogRef!: MatDialogRef<any>;

  cerrarModalRegistro(): void{
    return this.dialogRef.close();
  }
}
