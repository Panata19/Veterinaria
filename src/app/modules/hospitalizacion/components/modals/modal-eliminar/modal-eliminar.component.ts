import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-eliminar-hospitalizacion',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarhospitalizacionComponent implements OnInit {

  constructor( public dialogRefEliminarRegistroHosp: MatDialogRef<ModalEliminarhospitalizacionComponent> ) { }

  ngOnInit(): void {
  }

}
