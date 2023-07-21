import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clienteregistrado',
  templateUrl: './clienteregistrado.component.html',
  styleUrls: ['./clienteregistrado.component.css']
})
export class ClienteregistradoComponent {

  constructor(
    public dialogRef: MatDialogRef<ClienteregistradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

 

}
