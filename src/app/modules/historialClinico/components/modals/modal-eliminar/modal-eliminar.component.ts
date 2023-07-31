import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-eliminar-historial',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarHistorialComponent {

  constructor(public dialogRefHistorialclinico: MatDialogRef<ModalEliminarHistorialComponent>) { }

}
